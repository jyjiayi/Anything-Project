package main.entities;

import java.util.List;

import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;


//Question entity that corresponds to the question table in database
@Entity
@Table(name="Questions")
public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int qns_id;
	
	private String username;
	
	private String question;
	
	private char bookmark;
	
	private String selected_opt;
	
	@OneToMany(mappedBy = "qns_id")
	private List<Option> optionList;
	
	@ManyToOne
	@JoinColumn(name="username",insertable = false, updatable = false)
	private User user;
	
	public Question() {}
	public Question(String username, String question, char bookmark) {
		super();
		this.username = username;
		this.question = question;
		this.bookmark = bookmark;
	}
	
	public Question(String question) {
		super();
		this.question = question;
	}
	
	public int getQns_id() {
		return this.qns_id;
	}
	
	public void setQns_id(int qns_id) {
		this.qns_id = qns_id;
	}
	
	public String getUsername() {
		return this.username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getQuestion() {
		return this.question;
	}
	
	public void setQuestion(String question) {
		this.question = question;
	}
	
	public char getBookmark() {
		return this.bookmark;
	}
	
	public void setBookmark(char bookmark) {
		this.bookmark = bookmark;
	}
	
	public String getSelected_opt() {
		return this.selected_opt;
	}
	
	public void setSelected_opt(String selected_opt) {
		this.selected_opt = selected_opt;
	}
	
	public List<Option> getOptionList() {
		return this.optionList;
	}
	
	public void setOptionList(List<Option> optionList) {
		this.optionList = optionList;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
}
