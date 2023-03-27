package main.customPOJO;

import java.util.List;

import main.entities.Option;

// custom POJO for creating new dilemma
public class FullFormInputs {

	private String question;
	private List<Option> optList;
	private String username;
	private char bookmark;
	
	public FullFormInputs() {}
	
	public String getQuestion() {
		return this.question;
	}
	
	public void setQuestion(String question) {
		this.question = question;
	}
	
	public List<Option> getOptList() {
		return this.optList;
	}
	
	public void setOptList(List<Option> optList) {
		this.optList = optList;
	}
	
	public String getUsername() {
		return this.username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public char getBookmark() {
		return this.bookmark;
	}
	
	public void setBookmark(char bookmark) {
		this.bookmark = bookmark;
	}

	
	// for checking if inputs from front end are valid
	public boolean isValid() {
		// check if question input is empty or only whitespaces or there are less than 2 options
		if (this.question == null || this.question.isBlank() || optList.size() < 2) {
			return false;
		}
		
		//check that none of the inputs for the options are empty
		for (int i = 0; i < optList.size(); i++) {
			if (optList.get(i).getOption().isBlank()) {
				return false;
			}
		}
		
		
		return true;
	}
}
