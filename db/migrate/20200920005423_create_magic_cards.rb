class CreateMagicCards < ActiveRecord::Migration[6.0]
  def change
    create_table :magic_cards do |t|
      t.string :name
      t.string :image_url
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
