class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.references :user
      t.string :title
      t.string :author
      t.text :summary

      t.timestamps
    end
  end
end
