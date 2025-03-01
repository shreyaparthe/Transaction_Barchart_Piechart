package com.excelR.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.excelR.Service.TransactionService;
import com.excelR.model.Transaction;
import com.excelR.repository.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
 
import java.util.*;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/transactions")  // Remove "/api" for clarity
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {


    @Autowired
    private TransactionService transactionService;

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("/initialize")
    @ResponseBody
    public ResponseEntity<String> initializeDatabase() {
        transactionService.initializeDatabase();
        return ResponseEntity.ok("Database initialized successfully!");
    }

    @GetMapping
    @ResponseBody
    public Page<Transaction> getTransactions(
        @RequestParam(defaultValue = "3") int month,
        @RequestParam(defaultValue = "") String search,
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page - 1, size);
        return transactionRepository.searchTransactions(month, search, pageable);
    }

    @GetMapping("/statistics")
    @ResponseBody
    public Map<String, Object> getStatistics(@RequestParam int month) {
        int totalSoldItems = transactionRepository.countBySoldAndMonth(true, month);
        int totalNotSoldItems = transactionRepository.countBySoldAndMonth(false, month);
        double totalSales = transactionRepository.sumPriceBySoldAndMonth(month);

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalSaleAmount", totalSales);
        stats.put("totalSoldItems", totalSoldItems);
        stats.put("totalNotSoldItems", totalNotSoldItems);

        return stats;
    }

    @GetMapping("/bar-chart")
    @ResponseBody
    public Map<String, Integer> getBarChartData(@RequestParam int month) {
        Map<String, Integer> priceRanges = new LinkedHashMap<>();
        int[] ranges = {0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Integer.MAX_VALUE};
        
        for (int i = 0; i < ranges.length - 1; i++) {
            int count = transactionRepository.countByPriceBetweenAndMonth(ranges[i], ranges[i + 1], month);
            priceRanges.put(ranges[i] + " - " + (ranges[i + 1] == Integer.MAX_VALUE ? "above" : ranges[i + 1]), count);
        }
        
        return priceRanges;
    }

    @GetMapping("/pie-chart")
    @ResponseBody
    public Map<String, Integer> getPieChartData(@RequestParam int month) {
        List<Object[]> categoryData = transactionRepository.findCategoryDataByMonth(month);
        return categoryData.stream().collect(Collectors.toMap(o -> (String) o[0], o -> ((Long) o[1]).intValue()));
    }

    @GetMapping("/combined")
    @ResponseBody
    public Map<String, Object> getCombinedData(@RequestParam int month) {
        Map<String, Object> combinedData = new HashMap<>();
        combinedData.put("transactions", getTransactions(month, "", 1, 10).getContent());  // Fix: Convert Page to List
        combinedData.put("statistics", getStatistics(month));
        combinedData.put("barChart", getBarChartData(month));
        combinedData.put("pieChart", getPieChartData(month));
        return combinedData;
    }
    
//    @GetMapping("/transactions-page")
//   
//    public String showTransactionsPage() {
//        return "transactions-page"; // Should math the JSP file name (without .jsp)
//    }
//    
//    @GetMapping("/dashboard")
//    
//    public String showDashboard() {
//        return "dashboard"; // This will return dashboard.jsp
//    }
}
