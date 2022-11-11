class PizzasController < ApplicationController
  def index
    render json: Pizza.all, include: :toppings
  end
 
  def create
    pizza = Pizza.create!(pizza_params)
    render json: pizza, status: :created
  end
 
  def update
    pizza = Pizza.find(params[:id])
    pizza.update(pizza_params)
    render json: pizza
  end
 
  def destroy
    pizza = Pizza.find(params[:id])
    pizza.destroy
    head :no_content
  end
 
  private
 
  def pizza_params
    params.permit(:name)
  end
end
