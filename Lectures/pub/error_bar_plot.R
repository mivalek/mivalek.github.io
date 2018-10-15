

# function for error bars
error.bar <- function(x, y, upper, lower=upper, length=0.05,...){
  if(length(x) != length(y) | length(y) !=length(lower) | length(lower) != length(upper))
    stop("vectors must be same length")
  arrows(x,y+upper, x, y-lower, angle=90, code=3, length=length, ...)
}

# function for standard error of the mean
sem <- function(x){
  sd(x)/sqrt(length(x))
}

### generate data
climb <- rnorm(263, 3, 1.94)
swim <- rnorm(300, 3.32, 1.5)

# get vector of SEs
ses <- unlist(lapply(list(climb, swim), sem))
# get vector of means
means <- unlist(lapply(list(climb, swim), mean))
# first, draw empty plot
plot(NULL, type = "p", xlim = c(0, 3),
     ylim = c(min(means-ses), max(means+ses)), xlab= "", ylab = "Ape index (cm)", xaxt = "n",
     main = "", bty = "l", xaxt = "n")
error.bar(1:2, means, ses) # draw error bars
# draw points last so that they're on top of error bars
points(means, pch = 22, col = colors[3], bg = colors[2], cex = 2)
# add custom x axis
axis(1, at = 1:2, c("Climbers", "Swimmers"), tick = F)
