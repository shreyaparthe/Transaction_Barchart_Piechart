package com.excelR.repository;

import com.excelR.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Search transactions by month, title, description, or price
	@Query("SELECT t FROM Transaction t WHERE MONTH(t.dateOfSale) = :month AND " +
		       "(:search IS NULL OR :search = '' OR " +
		       "LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
		       "LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%')))")
		Page<Transaction> searchTransactions(@Param("month") int month, 
		                                     @Param("search") String search, 
		                                     Pageable pageable);

    // Count transactions that are sold or not sold for a given month
    @Query("SELECT COUNT(t) FROM Transaction t WHERE t.sold = :sold AND MONTH(t.dateOfSale) = :month")
    int countBySoldAndMonth(@Param("sold") boolean sold, @Param("month") int month);

    // Sum of total sales for a given month
    @Query("SELECT COALESCE(SUM(t.price), 0) FROM Transaction t WHERE t.sold = true AND MONTH(t.dateOfSale) = :month")
    double sumPriceBySoldAndMonth(@Param("month") int month);

    // Count transactions in a given price range for a specific month
    @Query("SELECT COUNT(t) FROM Transaction t WHERE t.price BETWEEN :minPrice AND :maxPrice AND MONTH(t.dateOfSale) = :month")
    int countByPriceBetweenAndMonth(@Param("minPrice") int minPrice, 
                                    @Param("maxPrice") int maxPrice, 
                                    @Param("month") int month);

    // Find unique categories and count items in each category for the selected month
    @Query("SELECT t.category, COUNT(t) FROM Transaction t WHERE MONTH(t.dateOfSale) = :month GROUP BY t.category")
    List<Object[]> findCategoryDataByMonth(@Param("month") int month);
    
    
}
