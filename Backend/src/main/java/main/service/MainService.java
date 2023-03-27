package main.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import main.customPOJO.FullFormInputs;
import main.customPOJO.OptList;
import main.entities.Option;
import main.entities.Question;
import main.entities.User;
import main.exceptions.ResourceNotFoundException;
import main.helperFunctions.WeightedRandGen;
import main.repository.OptionRepo;
import main.repository.QuestionRepo;
import main.repository.UserRepo;


// service class that calls the respective repo and process the data
@Service
public class MainService {
	
	private final UserRepo userRepo;
	private final QuestionRepo questionRepo;
	private final OptionRepo optionRepo;

	public MainService(UserRepo userRepo, QuestionRepo questionRepo, OptionRepo optionRepo) {
		this.userRepo = userRepo;
		this.optionRepo = optionRepo;
		this.questionRepo = questionRepo;
	}

	// for obtaining all dilemma based on given username
	@Transactional
	public User obtainUserDilemma(String username) throws ResourceNotFoundException {
		// check if username input from front end is empty
		if (username.isBlank())
			throw new IllegalArgumentException("Input is empty, please enter valid input.");
		
		// get the entity from user repo, throw error if username not present in db
		User user = userRepo.findById(username)
				.orElseThrow(() -> new ResourceNotFoundException("User not found for this username: " + username));
		return user;
	}

	// for inserting the new dilemma from custom POJO serialized from front end
	@Transactional
	public Question createNewDilemma(FullFormInputs fullFormInputs) throws Exception {

		// check if tthe inputs from front end are valid
		if (!fullFormInputs.isValid())
			throw new IllegalArgumentException("Empty input(s), please enter valid inputs.");
		
		// check if username is left empty
		if (!fullFormInputs.getUsername().isBlank()){

			// insert into Users table
			User user = new User(fullFormInputs.getUsername());
			user = userRepo.save(user);

			// insert into Questions table
			Question question = new Question(fullFormInputs.getUsername(), fullFormInputs.getQuestion(),
					fullFormInputs.getBookmark());
			question = questionRepo.save(question);
			
			// call helper function to insert the options and get selected option
			runQns(question, fullFormInputs);

			return question;
		}

		// insert into Questions table
		Question question = new Question(fullFormInputs.getQuestion());
		question = questionRepo.save(question);
		
		// call helper function to insert the options and get selected option
		runQns(question, fullFormInputs);

		return question;

	}

	
	// for obtaining a single dilemma based on a given qns_id
	@Transactional
	public Question obtainSingleDilemma(int qns_id) throws ResourceNotFoundException {

		// find question via Repo or throw is qns_id not found
		Question question = questionRepo.findById(Integer.valueOf(qns_id))
				.orElseThrow(() -> new ResourceNotFoundException("Dilemma not found for this id: " + qns_id));
		return question;
	}

	// for updating the option list of dilemma
	@Transactional
	public Question updateDilemma(OptList optList, int qns_id) throws Exception {
		
		// check if any of the options from option list in frontend is invalid
		if(!optList.isValid())
			throw new IllegalArgumentException("Empty input(s), please enter valid inputs.");
		
		// cast the primitive integer to wrapper Integer so as to cater to repo
		Integer integerQns_id = Integer.valueOf(qns_id);

		// delete all the current options for the question
		optionRepo.deleteOpt(integerQns_id);

		// store the options to generate randomly later
		WeightedRandGen optionDrops = new WeightedRandGen();

		// insert the new options
		for (int i = 0; i < optList.getOptList().size(); i++) {
			Option option = new Option(optList.getOptList().get(i).getOption(), optList.getOptList().get(i).getWeight(),
					integerQns_id);
			optionRepo.save(option);

			optionDrops.addEntry(option, optList.getOptList().get(i).getWeight());
		}

		// get the randomly selected option
		Option selectedOpt = optionDrops.getRandom();

		// update the question with newly selected option
		questionRepo.updateSelectedOpt(selectedOpt.getOption(), integerQns_id);
		
		// retrieve the updated question
		Question question2 = questionRepo.findById(integerQns_id)
				.orElseThrow(() -> new ResourceNotFoundException("Dilemma not found for this id: " + qns_id));

		return question2;
	}
	
	//helper function to insert the options and get selected option
	private void runQns(Question question, FullFormInputs fullFormInputs) {
		// store the options to generate randomly later
		WeightedRandGen optionDrops = new WeightedRandGen();

		// insert into Options Table
		List<Option> optList = fullFormInputs.getOptList();

		for (int i = 0; i < optList.size(); i++) {
			Option option = new Option(optList.get(i).getOption(), optList.get(i).getWeight(),
					question.getQns_id());
			optionRepo.save(option);

			optionDrops.addEntry(option, optList.get(i).getWeight());
		}

		// generate the selected option randomly
		Option selectedOpt = optionDrops.getRandom();

		// update the question in db with the selected option
		questionRepo.updateSelectedOpt(selectedOpt.getOption(), question.getQns_id());
		
	}

}
