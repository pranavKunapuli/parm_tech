import java.io.IOException;
import java.util.*;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * This class contains the main method and subsequent methods to extract data from Wikipedia - Oscars pages. 
 *
 */

public class UEFACrawler {
	
	/*METHODS*/
	/**
	 * Main method that initializes key input variables and calls the methods to extract certain data from Wikipedia. 
	 * @param args
	 */

	public static void main(String[] args) {
		String mainURL = "http://www.uefa.com/uefaeuro/history/index.html"; //The portal URL to be interacted with 
		
		
		PageURL(mainURL); //Find the URL of particular category of award
		
	}
	/**
	 * Method which interacts with portal URL to get URL of a particular category 
	 * @param baseURL, the portal URL 
	 * @param specificPage, the category for which url is required 
	 * @return
	 */
	
	public static void PageURL(String baseURL) {
		try {
			String yearURL = ""; //initialize variable
			Document doc = Jsoup.connect(baseURL).get();
			Elements linksTags = doc.select("a[href]"); //select all tags with hyperlinks 
			Iterator<Element> linksIter = linksTags.iterator(); //loop through all links 
			boolean isYearURL = false;
			while(linksIter.hasNext()) {
				Element curLink = linksIter.next(); //select a particular link in the loop 
				// last year
				if (curLink.text().contains("2012")) {
					isYearURL = false;
					yearURL = curLink.attr("abs:href"); //if there is a match, get the absolute link URL
					//System.out.println(yearURL);
					getTeamData(yearURL, curLink.text());
					break;
				}
				else if (isYearURL) {
					yearURL = curLink.attr("abs:href"); //if there is a match, get the absolute link URL
					//System.out.println(yearURL);
					getTeamData(yearURL, curLink.text());
				}
				// first year
				else if (curLink.text().contains("1960")) { //check to see if the link text matches the category being sought 
					isYearURL = true;
					yearURL = curLink.attr("abs:href"); //if there is a match, get the absolute link URL
					//System.out.println(yearURL);
					getTeamData(yearURL, curLink.text());
				} 
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
	}
	
	public static String getTeamData (String baseURL, String year) {
		//String baseURL = yearURL; //The portal URL to be interacted with 
		try {
			String teamsURL = ""; //initialize variable
			Document doc = Jsoup.connect(baseURL).get();
			Elements linksTags = doc.select("a[href]"); //select all tags with hyperlinks 
			Iterator<Element> linksIter = linksTags.iterator(); //loop through all links 
			while(linksIter.hasNext()) {
				Element curLink = linksIter.next(); //select a particular link in the loop 
				//System.out.println(curLink.text());
				if(curLink.text().contains("Teams")) { //check to see if the link text matches the category being sought 
					teamsURL = curLink.attr("abs:href"); //if there is a match, get the absolute link URL
					if (teamsURL.contains(year)) {
						//System.out.println(teamsURL);
						getTeamsFromAToZData(teamsURL);
					}
				} 
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "no valid url found";
	}
	
	public static String getTeamsFromAToZData (String baseURL) {
		try {
			String teamsURL = ""; //initialize variable
			Document doc = Jsoup.connect(baseURL).get();
			Elements linksTags = doc.select("a[href]"); //select all tags with hyperlinks 
			Iterator<Element> linksIter = linksTags.iterator(); //loop through all links 
			while(linksIter.hasNext()) {
				Element curLink = linksIter.next(); //select a particular link in the loop 
				if (curLink.text().contains("A to Z")) {
					teamsURL = curLink.attr("abs:href");
					//System.out.println(teamsURL);
					getAllTeamsFromYear(teamsURL);
				}
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "no valid url found";
	}
	
	public static String getAllTeamsFromYear(String baseURL) {
		try {
			String teamsURL = ""; //initialize variable
			Document doc = Jsoup.connect(baseURL).get();
			Elements linksTags = doc.select("a[href]"); //select all tags with hyperlinks 
			Iterator<Element> linksIter = linksTags.iterator(); //loop through all links 
			boolean parse = false;
			while(linksIter.hasNext()) {
				Element curLink = linksIter.next(); //select a particular link in the loop 
				if (curLink.text().equals("Z")) {
					parse = true;
				}
				else if (curLink.text().equals("Preliminary round") || 
						curLink.text().equals("Matchday 1") ||
						curLink.text().equals("Matchday -17") ||
						curLink.text().equals("Matchday -19") ||
						curLink.text().equals("Matchday -23")) {
					parse = false;
				}
				else if (parse) {
					if (!curLink.text().equals("Top")) {
						teamsURL = curLink.attr("abs:href");
						if (teamsURL.contains("team=")) {
							//System.out.println(teamsURL);
							
							String[] splitURL = teamsURL.split("/");
							teamsURL = splitURL[0] + "/" + splitURL[1] + "/" + splitURL[2] + "/" +
									splitURL[3] + "/" + splitURL[4] + "/" + splitURL[5] + "/" +
									splitURL[6] + "/matches/" + splitURL[7]; 
							//System.out.println(teamsURL);
							getTeamData(teamsURL);
						}
					}
				}
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "no valid url found";
	}
	
	public static String getTeamData(String baseURL) {
		try {
			String awardURL = ""; //initialize variable
			Document doc = Jsoup.connect(baseURL).get();
			Elements linksTags = doc.select("a[href]"); //select all tags with hyperlinks 
			Iterator<Element> linksIter = linksTags.iterator(); //loop through all links 
			while(linksIter.hasNext()) {
				Element curLink = linksIter.next(); //select a particular link in the loop 
				
				awardURL = curLink.attr("abs:href"); //if there is a match, get the absolute link URL
				if (curLink.text().endsWith(" L") || curLink.text().endsWith(" W") ) {
					
					awardURL = awardURL.replace("qualifiers/","");
					String[] splitArray = awardURL.split("/");
					awardURL = awardURL.replace(splitArray[7] + "/", "");
					//System.out.println(awardURL);
					
					String stage = getStage(awardURL);
					if (stage != "") {
						String overallMatch = curLink.text().substring(1);
						//System.out.println(overallMatch);
						String[] info = curLink.text().substring(1).split(" ");
						
						if (info.length == 3) {
						
						String firstCountryData = info[0];
						String secondCountryData = info[1];
						
						String dateData = info[2];
						dateData = dateData.substring(0, dateData.length() - 2);
						String[] dateArray = dateData.split("/");
						String year = dateArray[2];
						String[] firstCountry = firstCountryData.split(" ");
						String firstCountryName = firstCountry[0];
						String firstCountryScore = firstCountry[1];
						int firstCountryIntScore = Integer.parseInt(firstCountryScore);
						String firstCountryResult = "";
						
						String[] secondCountry = secondCountryData.split(" ");
						String secondCountryName = secondCountry[0];
						String secondCountryScore = secondCountry[1];
						int secondCountryIntScore = Integer.parseInt(secondCountryScore);
						String secondCountryResult = "";
						
						if (firstCountryIntScore > secondCountryIntScore) {
							firstCountryResult = "Won";
							secondCountryResult = "Lost";
						} else if (firstCountryIntScore < secondCountryIntScore) {
							firstCountryResult = "Lost";
							secondCountryResult = "Won";
						} else {
							firstCountryResult = "Tie";
							secondCountryResult = "Tie";
						}
						
						System.out.println("Country: " + firstCountryName);
						System.out.println("Score: " + firstCountryScore);
						System.out.println("Tournament: UEFA");
						System.out.println("Stage: " + stage);
						System.out.println("Year: " + year);
						System.out.println("Result: " + firstCountryResult);
						
						
						System.out.println();
						
						System.out.println("Country: " + secondCountryName);
						System.out.println("Score: " + secondCountryScore);
						System.out.println("Tournament: UEFA");
						System.out.println("Stage: " + stage);
						System.out.println("Year: " + year);
						System.out.println("Result: " + secondCountryResult);
						
						System.out.println();
						
						}
						
					}
				}
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "could not find award url"; //in case the url required could not be found 	
	}
	
	public static String getStage(String baseURL) {
		try {
			String awardURL = ""; //initialize variable
			Document doc = Jsoup.connect(baseURL).get();
			Elements barTitle = doc.getElementsByClass("barTitle");
			
			Element e = barTitle.first();
			if (e != null) {
				String stage = e.text();
				stage = (stage.split(":"))[0];
				return stage;
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ""; //in case the url required could not be found 	
	}
	

}

