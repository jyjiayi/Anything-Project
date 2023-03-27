package main.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import main.customPOJO.FullFormInputs;
import main.customPOJO.OptList;
import main.entities.Question;
import main.entities.User;
import main.service.MainService;

@CrossOrigin
@RestController
public class MainController {

	private final MainService mainService;

	public MainController(MainService mainService) {
		this.mainService = mainService;
	}

	// to get dilemma based on given username
	@GetMapping("/viewDilemma")
	public ResponseEntity<User> userDashBoard(@RequestParam(name = "username") String username) throws Exception {

		User user = this.mainService.obtainUserDilemma(username);

		return ResponseEntity.ok().body(user);
	}

	// to post a new dilemma
	@PostMapping("/newDilemma")
	public ResponseEntity<?> newDilemma(@RequestBody FullFormInputs fullFormInputs) throws Exception {

		Question question = mainService.createNewDilemma(fullFormInputs);

		return ResponseEntity.ok().body(question);
	}

	// to get a single dilemma based on the qns_id
	@GetMapping("/singleDilemma/{qns_id}")
	public ResponseEntity<Question> getSingleDilemma(@PathVariable(value = "qns_id") int qns_id) throws Exception {

		Question question = this.mainService.obtainSingleDilemma(qns_id);

		return ResponseEntity.ok().body(question);
	}

	// to post so as to update the options for a dilemma
	@PostMapping("/rerunDilemma/{qns_id}")
	public ResponseEntity<Question> getSingleDilemma(@RequestBody OptList optList,
			@PathVariable(value = "qns_id") int qns_id) throws Exception {
		
		Question question = this.mainService.updateDilemma(optList, qns_id);

		return ResponseEntity.ok().body(question);
	}

}
