package main.entities;

import javax.persistence.GenerationType;
import javax.persistence.Table;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

//Option entity that corresponds to the option table in database
@Entity
@Table(name="Options")
public class Option {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int option_id;
	
	private int qns_id;
	
	private String option;
	
	private int weight;

	@ManyToOne
	@JoinColumn(name="qns_id", insertable = false, updatable = false)
	private Question question;
	
	public Option() {}
	
	public Option(String option, int weight, int qns_id) {
		super();
		this.option = option;
		this.weight = weight;
		this.qns_id = qns_id;
	}
	
	public Option(int option_id) {
		super();
		this.option_id = option_id;
	}
	
	
	public int getOption_id() {
		return this.option_id;
	}
	
	public void setOption_id(int option_id) {
		this.option_id = option_id;
	}
	
	public int getQns_id() {
		return this.qns_id;
	}
	
	public void setQns_id(int qns_id) {
		this.qns_id = qns_id;
	}
	
	public String getOption() {
		return this.option;
	}
	
	public void setOption(String option) {
		this.option = option;
	}
	
	public int getWeight() {
		return this.weight;
	}
	
	public void setWeight(int weight) {
		this.weight = weight;
	}
	
	
	public void setQuestion(Question question) {
		this.question = question;
	}
	
}
