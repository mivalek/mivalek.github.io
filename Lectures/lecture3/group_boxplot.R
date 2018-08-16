
# change some grephical parameters
# xpd = T allows to put the legend outside of the plot
# mar changes the margins - top, left, bottom, right - so that the legend doesn't get cropped
par(xpd = TRUE, mar = c(5.1, 4.1, .1, 5.1))

# plot
boxplot(data$mark ~ data$dpt + data$eye_col,
        # hexadecimal colour codes
        # many colour names, e.g., "blue", "green", can be used
        col = c("#eee8d5", "#002b36", "#ffa733"),
        xlab = "Department", ylab = "Mark",
        # no x axis ticks, we will provide custom ones below
        xaxt = "n",
        # where should the boxes be plotted?
        # by default at = 1:n
        # the below inserts a .5 gap between each set of 3 boxes
        at = c(1:3, (4:6) + .5, 8:10))

# custom axis ticks
axis(1, # 1 means at the bottom of the plot
     at=c(2, 5.5, 9), # position of ticks
     labels=levels(data$dpt)) # labels

# create legend
legend(11, 85, # x and y coordinates of where the legend shoul be
       legend = levels(data$eye_col), # labels
       fill = c("#eee8d5", "#002b36", "#ffa733"), # colpours
       border = "#93a1a1", # colour of borders around legend boxes
       title = "Eye colour", bty = "n") # no box around the legend