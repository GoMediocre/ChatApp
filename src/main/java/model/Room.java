package model;

import javax.websocket.Session;

public class Room {
	
	private Session from;
	private Session to;
	private String interest;
	private Gender gender;
	private String connect;

	public Session getFrom() {
		return from;
	}
	
	public void setFrom(Session from) {
		this.from = from;
	}
	
	public Session getTo() {
		return to;
	}
	
	public void setTo(Session to) {
		this.to = to;
	}
	
	public String getConnect() {
		return connect;
	}
	
	public void setConnect(String connect) {
		this.connect = connect;
	}

	
}
