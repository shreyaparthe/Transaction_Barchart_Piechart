package com.excelR.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.OffsetDateTime;

@Entity
public class Transaction {

    @Id
    private Long id;
    private String title;
    @Column(length = 800)
    private String description;
    private Double price;
    private String category;
    private String image;
    private Boolean sold;

    // Change LocalDateTime to OffsetDateTime
    private OffsetDateTime dateOfSale;

    @Override
    public String toString() {
        return "Transaction [id=" + id + ", title=" + title + ", description=" + description + ", price=" + price
                + ", category=" + category + ", image=" + image + ", sold=" + sold + ", dateOfSale=" + dateOfSale
                + "]";
    }

    public Transaction(Long id, String title, String description, Double price, String category, String image,
            Boolean sold, OffsetDateTime dateOfSale) {
        super();
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.category = category;
        this.image = image;
        this.sold = sold;
        this.dateOfSale = dateOfSale;
    }

    public Transaction() {
        super();
        // TODO Auto-generated constructor stub
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Boolean getSold() {
        return sold;
    }

    public void setSold(Boolean sold) {
        this.sold = sold;
    }

    public OffsetDateTime getDateOfSale() {
        return dateOfSale;
    }

    public void setDateOfSale(OffsetDateTime dateOfSale) {
        this.dateOfSale = dateOfSale;
    }
}
