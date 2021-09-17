# if the review saved in our db
    # return our review json to our page
    # return an empty review form
# 
    # re send the review form

if @review.persisted?
  json.form json.partial!('reviews/form.html.erb', restaurant: @restaurant, review: Review.new)
  json.inserted_item json.partial!('restaurants/review.html.erb', review: @review)
else
  json.form json.partial!('reviews/form.html.erb', restaurant: @restaurant, review: @review)
end