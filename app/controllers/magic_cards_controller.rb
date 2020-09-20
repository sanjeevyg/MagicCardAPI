class MagicCardsController < ApplicationController
    def index 
        @magic_cards = MagicCard.all 
        render json: @magic_cards, include: [:user]
    end

    def index 
        @magic_card = MagicCard.find(params[:id])
        render json: @magic_card
    end

    def create 
        @magic_card = MagicCard.new(magicCard_params)
        if @magic_card.valid?
            @magic_card.save
            render json: "Magic card created!"
        else 
            render json: @magic_card.errors.messages
        end
    end

    def update
        @magic_card = MagicCard.find(params[:id])
        if @magic_card.update(magicCard_params)
            render json: @magic_card
        else 
            render json: @magic_card.errors.messages
        end
    end

    def destroy 
        @magic_card = MagicCard.find(params[:id])
        @magic_card.destroy
        
        render json: "#{@magic_card} is deleted"
    end

    private 

    def magicCard_params 
        params.require(:magic_card).permit([:name, :image_url])
    end
end
