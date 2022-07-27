# frozen_string_literal: true

class User < ActiveRecord::Base
  has_many :books, dependent: :destroy

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  validates :name, presence: true
  validates :name, length: { maximum: 30 }
end
