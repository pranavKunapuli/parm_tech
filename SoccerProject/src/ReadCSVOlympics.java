
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import org.apache.commons.csv.CSVParser; 
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;

public class ReadCSVOlympics {
	public static void main(String[] args) {
		//CSVFormat format = CSVFormat.RFC4180.withHeader().withDelimiter(',');
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
					System.out.println("Sport: " + sport + " Gender: " + gender);
					int year = Integer.parseInt(record.get("Edition"));
					String noc = record.get("NOC");
					String medal = record.get("Medal");
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