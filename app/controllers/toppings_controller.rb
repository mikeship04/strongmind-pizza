class ToppingsController < ApplicationController

  def index
    render json: Topping.all
  end

  def create
    topping = Topping.create!(topping_params)
    render json: topping, status: :created
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
    params.permit(:topping)
  end

end
