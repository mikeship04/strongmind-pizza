class ToppingsController < ApplicationController

  def index
    render json: Topping.all, include: :pizzas
  end

  def show
    topping = Topping.find(params[:id])
    render json: topping
  end
 
  def create
    topping = Topping.create!(topping_params)
    render json: topping, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end
 
  def update
    topping = Topping.find(params[:id])
    topping.update(topping_params)
    render json: topping
  end
 
  def destroy
    topping = Topping.find(params[:id])
    topping.destroy
    head :no_content
  end
 
  private
 
  def topping_params
    params.permit(:name)
  end

end
