module Api
    module V1
        class Api::V1::BooksController < ApplicationController
            before_action :authenticate_user!, only: ["index", "create"]
        
            def index
                books = Book.all
                books_array = books.map do |book|
                    {
                        id: book.id,
                        user_id: book.user.id,
                        title: book.title,
                        author: book.author,
                        summary: book.summary
                    }
                end
        
                render json: books_array, status: 200
            end
        
            def create
                book = Book.create(book_params)
        
                if book.save
                    render json: { id: book.id, email: current_user.email, message: '成功しました' }, status: 200
                else
                    render json: { message: '保存できませんでした', errors: book.errors.messages }, status: 400
                end
            end

            def update
                book = Book.find(params[:id])
                if book.update(book_params)
                    render json: { id: book.id, email: current_user.email, message: '更新しました' }
                else
                    render json: { message: '更新に失敗しました', errors: book.errors.messages }, status: 400
                end
            end
        
            def destroy
                book = Book.find(params[:id])

                if book.destroy
                    render json: { id: book.id, email: book.user.email, message: '削除に成功しました' }, status: 200
                else
                    render json: { message: '削除できませんでした', errors: book.errors.messages }, status: 400
                end
            end
        
            private
        
            def book_params
                params.require(:book).permit(:title, :author, :summary).merge(user_id: current_user.id)
            end
        end
    end
end

