# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
puts " Seeding data..."

puts "Deleting all data"
Topping.destroy_all
Pizza.destroy_all

puts "Creating pizzas..."
p1 = Pizza.create(name: 'Pepperoni pizza')
p2 = Pizza.create(name: 'Supreme pizza')
p3 = Pizza.create(name: 'The Meats')

puts "Creating toppings..."
t1 = Topping.create(name: 'Pepperoni')
t2 = Topping.create(name: 'Sausage')
t3 = Topping.create(name: 'Olive')
t4 = Topping.create(name: 'Green Pepper')
t5 = Topping.create(name: 'Onion')
t6 = Topping.create(name: 'Bacon')

puts "Adding toppings to pizzas..."
p1.toppings = [t1]
p2.toppings = [t1, t2, t3, t4, t5]
p3.toppings = [t1, t2, t6]

puts "✅ Done seeding!"