import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.URL;
import java.util.ArrayList;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

class FifaParser {

	public static void main(String[] args) throws IOException {
		Document fifa = Jsoup.connect("http://www.fifa.com/fifa-tournaments/archive/worldcup/index.html").get();
		
		Elements tournaments = fifa.select("a.link-wrap");
		
		for(Element tournament : tournaments) {
			String[] parts = tournament.attr("href").split("index");
			String link = "http://www.fifa.com" + parts[0] + "/teams/index.html";
			
			System.out.println(link);
			
			ArrayList<String> teams = new ArrayList<String>();
			
			Document teamsPage = Jsoup.connect(link).get();
			Elements teamLinks = teamsPage.select("a[href].team");
			
			String title = teamsPage.select("h1.title").first().text().replaceAll("\"", "");
			String year = title.split(" ", 2)[0];
			
			for(Element e : teamLinks) {
				teams.add("http://www.fifa.com" + e.attr("href"));
			}
			
			for(String s : teams) {
				Document team = Jsoup.connect(s).get();
				
				String teamName = team.select("div.fdh-wrap > h1").first().text();
				
				try {
					BufferedWriter writer = new BufferedWriter(new FileWriter("/Users/Kunapuli/Desktop/CIS 550/Project/Has_Team.sql", true));
					
					writer.write("INSERT INTO Has_Team VALUES('" + teamName + "', '" + year + "');");
					
					writer.newLine();
					writer.flush();
					writer.close();
				} catch (Exception c) {
					System.out.println(c.getMessage());
					c.printStackTrace();
				}
				
				Elements divs = team.select("div.mu.result");
				
				boolean competed = false;
				
				for(Element e : divs) {
					String stage = e.select("div.mu-i-group").first().text();
					if(stage.contains("Group")) {  continue; }
					String home = e.select("div.t.home").select("span.t-nText").first().text();
					String away = e.select("div.t.away").select("span.t-nText").first().text();
					String score = e.select("span.s-scoreText").first().text();
					String[] split = score.split("-", 2);
					int homeScore = Integer.parseInt(split[0]);
					int awayScore = Integer.parseInt(split[1]);
					
					competed = true;
					
					try {
						BufferedWriter writer = new BufferedWriter(new FileWriter("/Users/Kunapuli/Desktop/CIS 550/Project/Competes_In.sql", true));
						
						if(teamName.equalsIgnoreCase(home)) {
							if(homeScore > awayScore) {
								writer.write("INSERT INTO Competes_In VALUES('" + teamName + "', '" + year +
										"', 'FIFA', '" + stage + "', '" + score + "', 'W');");
							} else {
								writer.write("INSERT INTO Competes_In VALUES('" + teamName + "', '" + year +
										"', 'FIFA', '" + stage + "', '" + score + "', 'L');");
							}
						} else {
							if(awayScore > homeScore) {
								writer.write("INSERT INTO Competes_In VALUES('" + teamName + "', '" + year +
										"', 'FIFA', '" + stage + "', '" + score + "', 'W');");
							} else {
								writer.write("INSERT INTO Competes_In VALUES('" + teamName + "', '" + year +
										"', 'FIFA', '" + stage + "', '" + score + "', 'L');");
							}
						}
						writer.newLine();
						
						writer.flush();
						writer.close();
					} catch (Exception c) {
						System.out.println(c.getMessage());
						c.printStackTrace();
					}
				}
				
				if(!competed) {
					try {
						BufferedWriter writer = new BufferedWriter(new FileWriter("/Users/Kunapuli/Desktop/CIS 550/Project/Competes_In.sql", true));
						
						writer.write("INSERT INTO Competes_In VALUES('" + teamName + "', '" + year +
								"', 'FIFA', 'Group', '0-0', 'L');");
						
						writer.newLine();
						writer.flush();
						writer.close();
					} catch (Exception c) {
						System.out.println(c.getMessage());
						c.printStackTrace();
					}
				}
				
				Element playerDataLink = team.select("div.players > div.module > div.inner").first();
				String playerDataURL = "http://www.fifa.com" + playerDataLink.attr("data-url");
				
				System.out.println(playerDataURL);
				
				Document playerDoc = Jsoup.connect(playerDataURL).get();
				Elements players = playerDoc.select("div[data-player-id]");
				
				System.out.println(players.size());
				
				for(Element e : players) {
					
					String name = e.select("span.p-n-webname").first().text().toUpperCase().replaceAll("'", "");
					String position = e.select("span.p-i-fieldpos").first().text();
					
					if(position.equals("Coach")) {
						try {
							BufferedWriter writer = new BufferedWriter(new FileWriter("/Users/Kunapuli/Desktop/CIS 550/Project/Coach.sql", true));
							writer.write("INSERT INTO Coach VALUES ('" + name + "');");
							writer.newLine();
							writer.flush();
							writer.close();
							
							writer = new BufferedWriter(new FileWriter("/Users/Kunapuli/Desktop/CIS 550/Project/Coaches.sql", true));
							writer.write("INSERT INTO Coaches VALUES ('" + name + "', '" + teamName + "', '" + year + "');");
							writer.newLine();
							writer.flush();
							writer.close();
						} catch (Exception c) {
							System.out.println(c.getMessage());
							c.printStackTrace();
						}
					} else {
						try {
							BufferedWriter writer = new BufferedWriter(new FileWriter("/Users/Kunapuli/Desktop/CIS 550/Project/Player.sql", true));
							writer.write("INSERT INTO Player VALUES ('" + name + "', '" + position + "');");
							writer.newLine();
							writer.flush();
							writer.close();
							
							writer = new BufferedWriter(new FileWriter("/Users/Kunapuli/Desktop/CIS 550/Project/Plays_For.sql", true));
							writer.write("INSERT INTO Plays_For VALUES ('" + name + "', '" + teamName + "', '" + year + "');");
							writer.newLine();
							writer.flush();
							writer.close();
						} catch (Exception c) {
							System.out.println(c.getMessage());
							c.printStackTrace();
						}
					}
				}
			}
		
		}
	}
}