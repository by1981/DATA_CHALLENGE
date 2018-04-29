CREATE DATABASE sakila;
USE sakila;

-- 1a. Display the first and last names of all actors from the table actor
SELECT first_name from actor;
SELECT last_name from actor;

-- New Column with name: Actor_Name

ALTER TABLE actor ADD COLUMN Actor_Name VARCHAR(50); 
UPDATE actor SET Actor_Name= CONCAT(first_name, " ", last_name);

SELECT * FROM actor;

-- 2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?
SELECT actor_id, first_name, last_name FROM actor WHERE (first_name LIKE 'Joe');

-- 2b. Find all actors whose last name contain the letters GEN:

SELECT * FROM actor WHERE last_name LIKE '%GEN%';

-- 2c. Find all actors whose last names contain the letters LI. This time, order the rows by last name and first name, in that order:
SELECT last_name, first_name FROM actor WHERE last_name LIKE '%LI%';

-- 2d. Using IN, display the country_id and country columns of the following countries: Afghanistan, Bangladesh, and China:
SELECT country_id, country FROM country WHERE country IN ( "Afghanistan", "Bangladesh", "China "); 

-- 3a. Add a middle_name column to the table actor. Position it between first_name and last_name. Hint: you will need to specify the data type.
ALTER TABLE actor ADD COLUMN middle_name VARCHAR(50); 
SELECT actor_id, first_name, middle_name, last_name, last_update, Actor_name FROM ACTOR;

-- 3b. You realize that some of these actors have tremendously long last names. Change the data type of the middle_name column to blobs.
ALTER TABLE actor MODIFY COLUMN middle_name BLOB;

-- 3c. Now delete the middle_name column.
ALTER TABLE actor DROP COLUMN middle_name;


-- 4a. List the last names of actors, as well as how many actors have that last name.
SELECT  last_name ,count(*) AS C FROM  actor GROUP BY last_name;

-- 4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors
SELECT  last_name ,count(*) AS C FROM  actor GROUP BY last_name HAVING COUNT(*) > 1;

-- 4c. Oh, no! The actor HARPO WILLIAMS was accidentally entered in the actor table as GROUCHO WILLIAMS, the name of Harpo's second cousin's husband's yoga teacher. Write a query to fix the record.
UPDATE actor
	SET    first_name = replace(first_name, 'GROUCHO', 'HARPO')
	WHERE  first_name LIKE 'GROUCHO' AND last_name like 'WILLIAMS';

SELECT * FROM actor;

-- 4d. Perhaps we were too hasty in changing GROUCHO to HARPO. It turns out that GROUCHO was the correct name after all! In a single query, if the first name of the actor is currently HARPO, change it to GROUCHO. Otherwise, change the first name to MUCHO GROUCHO, as that is exactly what the actor will be with the grievous error. BE CAREFUL NOT TO CHANGE THE FIRST NAME OF EVERY ACTOR TO MUCHO GROUCHO, HOWEVER! (Hint: update the record using a unique identifier.)
UPDATE actor
	SET  first_name = replace(first_name, 'HARPO', 'GROUCHO')
	WHERE  first_name LIKE 'HARPO' AND last_name like 'WILLIAMS';

SELECT * FROM actor;

-- 5a. You cannot locate the schema of the address table. Which query would you use to re-create it?
SHOW CREATE TABLE address;

-- 6a. Use JOIN to display the first and last names, as well as the address, of each staff member. Use the tables staff and address
SELECT staff.first_name, staff.last_name, address.address
FROM staff
	INNER JOIN address ON staff.address_id = address.address_id;

-- 6b. Use JOIN to display the total amount rung up by each staff member in August of 2005. Use tables staff and payment.
CREATE TABLE staff_amountrung
SELECT staff_id, sum(amount) as amount 
	FROM payment 
    WHERE payment.payment_date> '2005-08-01' AND payment.payment_date<'2005-09-01'GROUP BY payment.staff_id;

SELECT staff.staff_id, staff.first_name, staff.last_name, staff_amountrung.amount
FROM staff
	INNER JOIN staff_amountrung ON staff.staff_id=staff_amountrung.staff_id;

-- 6c. List each film and the number of actors who are listed for that film. Use tables film_actor and film. Use inner join.
SELECT count(film.film_id), film.title, film_actor.film_id
FROM film
	INNER JOIN film_actor on film.film_id=film_actor.film_id GROUP BY film_actor.film_id;

-- 6d. How many copies of the film Hunchback Impossible exist in the inventory system?
SELECT COUNT(*) as `Number of Times` 
FROM inventory 
	WHERE film_id IN ( 
									SELECT film_id as ID 
                                    FROM film 
										WHERE film.title='Hunchback Impossible'
									);

-- 6e. Using the tables payment and customer and the JOIN command, list the total paid by each customer. List the customers alphabetically by last name:
CREATE TABLE customer_amount
SELECT customer_id, sum(amount) as `Total Amount Paid` FROM payment GROUP BY customer_id;

SELECT customer.first_name, customer.last_name, customer_amount.`Total Amount Paid`
FROM customer
	INNER JOIN customer_amount on customer.customer_id=customer_amount.customer_id ORDER BY customer.last_name;

-- 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence, films starting with the letters K and Q have also soared in popularity. Use subqueries to display the titles of movies starting with the letters K and Q whose language is English. 
SELECT title FROM film
WHERE (film.title LIKE 'K%'  OR  film.title LIKE 'Q%' ) AND  language_id IN
(SELECT language_id 
	FROM `language` WHERE name='English'
);

-- 7b. Use subqueries to display all actors who appear in the film Alone Trip.
SELECT * FROM actor
WHERE actor_id IN
	(SELECT actor_id FROM film_actor
		WHERE film_id IN
			(SELECT film_id FROM film WHERE film.title="Alone Trip")
	);

-- 7c. You want to run an email marketing campaign in Canada, for which you will need the names and email addresses of all Canadian customers. Use joins to retrieve this information.
SELECT customer.first_name,customer.last_name, customer.email,country.country
FROM city
INNER JOIN country
	ON city.country_id=country.country_id
INNER JOIN address
	ON city.city_id=address.city_id
INNER JOIN customer
	ON customer.address_id=address.address_id WHERE country.country='Canada';

-- 7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. Identify all movies categorized as famiy films.
CREATE TABLE film_with_id
SELECT film_id FROM film_category
WHERE category_id IN
	(SELECT category_id 
		FROM category 
		Where Category.`name`="Family"
	);

SELECT film.film_id, film.title
FROM film
	INNER JOIN film_with_id on film.film_id=film_with_id.film_id;
    
-- 7e. Display the most frequently rented movies in descending order.
SELECT count(film.title), film.title
FROM inventory
INNER JOIN film
	ON film.film_id=inventory.film_id
INNER JOIN rental
	ON rental.inventory_id=inventory.inventory_id GROUP BY title ORDER BY count(title) DESC;

-- 7f. Write a query to display how much business, in dollars, each store brought in.
SELECT staff.store_id, SUM(payment.amount) AS `Total Amount`
FROM staff 
	INNER JOIN payment on payment.staff_id=staff.staff_id GROUP BY staff.staff_id;

-- 7g. Write a query to display for each store its store ID, city, and country.
SELECT store.store_id, city.city, country.country
FROM store
INNER JOIN address
	ON store.address_id=address.address_id
INNER JOIN city
	ON address.city_id=city.city_id
INNER JOIN country
	ON city.country_id=country.country_id;

-- 7h. List the top five genres in gross revenue in descending order. (Hint: you may need to use the following tables: category, film_category, inventory, payment, and rental.)
SELECT `name`, count('category_id'), sum(amount)
 FROM rental
INNER JOIN payment 
    ON payment.rental_id=rental.rental_id
INNER JOIN inventory
	ON inventory.inventory_id=rental.inventory_id
INNER JOIN film_category
	ON film_category.film_id=inventory.film_id
INNER JOIN category
	ON category.category_id=film_category.category_id GROUP BY `name` ORDER BY sum(amount) DESC LIMIT 5;

-- 8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. Use the solution from the problem above to create a view. If you haven't solved 7h, you can substitute another query to create a view.\
CREATE TABLE Genre_movie
SELECT `name`, count('category_id'), sum(amount)
 FROM rental
INNER JOIN payment 
    ON payment.rental_id=rental.rental_id
INNER JOIN inventory
	ON inventory.inventory_id=rental.inventory_id
INNER JOIN film_category
	ON film_category.film_id=inventory.film_id
INNER JOIN category
	ON category.category_id=film_category.category_id GROUP BY `name` ORDER BY sum(amount) DESC LIMIT 5;

CREATE VIEW top_five_genres AS SELECT * FROM Genre_movie;

-- 8b. How would you display the view that you created in 8a?
SELECT * FROM top_five_genres;

-- 8c. You find that you no longer need the view top_five_genres. Write a query to delete it
DROP VIEW top_five_genres;






