

# function for error bars
error.bar <- function(x, y, upper, lower=upper, length=0.05,...){
  if(length(x) != length(y) | length(y) !=length(lower) | length(lower) != length(upper))
    stop("vectors must be same length")
  arrows(x,y+upper, x, y-lower, angle=90, code=3, length=length, ...)
}

### generate data
climb <- rnorm(263, 3, 1.94)
swim <- rnorm(300, 3.32, 1.5)
df <- data.frame(group = rep(0:1, c(length(climb), length(swim))),
                 ape_index = c(climb, swim))

### get confidence intervals
# confint() takes a linear model
ci <- confint(lm(ape_index ~ group, df))
# calculate distance of limits of CIs from their mid-points (respective group means)
ci <- abs((ci[ , 1] - ci[ , 2])) / 2
# get means
means <- unlist(lapply(list(climb, swim), mean))


# first, draw empty plot
plot(NULL, type = "p", xlim = c(0, 3),
     ylim = c(min(means-ci), max(means+ci)), xlab= "", ylab = "Ape index (cm)", xaxt = "n",
     main = "", bty = "l", xaxt = "n")
error.bar(1:2, means, ci) # draw error bars
# draw points last so that they're on top of error bars
points(means, pch = 22, col = colors[2], bg = colors[3], cex = 2)
# add custom x axis
axis(1, at = 1:2, c("Climbers", "Swimmers"), tick = F)
