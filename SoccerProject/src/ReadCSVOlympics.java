
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

import org.apache.commons.csv.CSVParser; 
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;

public class ReadCSVOlympics {
 private static HashMap<String, String> countryCodes = new HashMap<String, String>();
 
 public static void main(String[] args) {
  //CSVFormat format = CSVFormat.RFC4180.withHeader().withDelimiter(',');
  CSVParser parseCountryCodes;
  try {
   FileReader countries = new FileReader("Summer Olympic medallists 1896 to 2008 - IOC COUNTRY CODES.csv");
   parseCountryCodes = CSVFormat.EXCEL.withHeader("Country", "Int Olympics Committee code", "ISO code").parse(countries);
   for (CSVRecord country: parseCountryCodes) {
    countryCodes.put(country.get("Int Olympics Committee code"), country.get("Country"));
   }
  } catch (FileNotFoundException e) {
   
  } catch (IOException e) {
   // TODO Auto-generated catch block
   e.printStackTrace();
  }
  CSVParser parser;
  try {
   FileReader olympics = new FileReader("Summer Olympic medallists 1896 to 2008 - ALL MEDALISTS.csv");
   //CSVFormat format = new CSVFormat.EXCEL;
   parser = CSVFormat.EXCEL.withHeader("City", "Edition", "Sport", "Discipline", "Athlete", "NOC",
     "Gender", "Event", "Event_gender", "Medal").parse(olympics); 
   for (CSVRecord record: parser) {
    String sport = record.get("Discipline");
    String gender = record.get("Event_gender");
    if (sport.equals("Football") && gender.equals("M")) {
     String year = record.get("Edition");
     String noc = record.get("NOC");
     String medal = record.get("Medal");
     String country = record.get("NOC");
     if (country != null) {
      country = countryCodes.get(country);
      if (country != null) {
       if (country.equals("United Kingdom")) {
        country = "England";
       }
      }
     }
     String player = record.get("Athlete");
     String temp = "";
     for (int i = 0; i < player.length(); i++) {
      char a = player.charAt(i);
      if (a != '\'') {
       temp += a;
      }
     }
     player = temp;
     String[] names = player.toUpperCase().split(",");
     player = names[0].trim();
     if (names.length > 1) {
      player = names[1].trim() + " " + player;
     }
     //write out the stuff
     BufferedWriter writer = new BufferedWriter(new FileWriter("/Mia/School/Upenn/School 2016-2017/CIS 550/parm_tech/Olympics_Plays_For.sql", true));
     writer.write("INSERT INTO Plays_For VALUES('" + player + "', '" + country + "', " + year + ");");
     writer.newLine();
     writer.flush();
     writer.close();
     
     writer = new BufferedWriter(new FileWriter("/Mia/School/Upenn/School 2016-2017/CIS 550/parm_tech/Olympics_Has_Team.sql", true));
     writer.write("INSERT INTO Has_Team VALUES('"+ country + "', " + year + ");");
     writer.newLine();
     writer.flush();
     writer.close();
     
     writer = new BufferedWriter(new FileWriter("/Mia/School/Upenn/School 2016-2017/CIS 550/parm_tech/Olympics_Competes_In.sql", true));
     writer.write("INSERT INTO Competes_In VALUES('" + country + "', " + year + ", " + "'Olympics','" + medal + "', 'null', 'null');");
     writer.newLine();
     writer.flush();
     writer.close();
     
     writer = new BufferedWriter(new FileWriter("/Mia/School/Upenn/School 2016-2017/CIS 550/parm_tech/Olympics_Players.sql", true));
     writer.write("INSERT INTO Player VALUES('"+ player + "', 'null');");
     writer.newLine();
     writer.flush();
     writer.close();
    }

   }
  } catch (FileNotFoundException e) {
   // TODO Auto-generated catch block
   e.printStackTrace();
  } catch (IOException e) {
   // TODO Auto-generated catch block
   e.printStackTrace();
  }
  
 }

}