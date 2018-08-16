
# plot data for those who got a 1st
plot(jitter(data$age[data$degree == "1"]), # add jitter to points
     data$mark[data$degree == "1"],
     pch = 20, col = "#ffa73399", # last 2 digits specify transparency 
  xlab = "Age", ylab = "Mark")

# add points for those who got a 2nd (different colour)
points(jitter(data$age[data$degree != "1"]), data$mark[data$degree != "1"], pch = 20, col = "#eee8d599")

# add the lines of best fit
abline(lm(mark ~ age, data[data$degree == 1, ]), col = "#ffa733")
abline(lm(mark ~ age, data[data$degree != 1, ]), col = "#eee8d5")

# add legend
legend("bottomright", # position
       legend = c("1st", "2nd"), fill = c("#ffa733", "#eee8d5"), bty = "n", border = F, title = "Degree")