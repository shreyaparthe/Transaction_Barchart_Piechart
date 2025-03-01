package com.excelR.Service;

import com.excelR.model.Transaction;
import com.excelR.repository.TransactionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.YearMonth;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

	    @Autowired
	    private TransactionRepository transactionRepository;

	    @Autowired
	    private RestTemplate restTemplate;

	    private final String API_URL = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

	    public void initializeDatabase() {
	        ResponseEntity<Transaction[]> response = restTemplate.getForEntity(API_URL, Transaction[].class);
	        Transaction[] transactions = response.getBody();
	        if (transactions != null) {
	            transactionRepository.saveAll(Arrays.asList(transactions));
	        }
	    }
	
  
}
