
# set random seed to get the same results every time
set.seed(1234)

### DATA
# observed data
l1_data <- rep(c("cog", "lel", "psy"), c(41, 52, 55))
# expected frequencies
exp <- rep(length(l1_data) / length(unique(l1_data)),
           length(unique(l1_data))) # there are 3 unique values
names(exp) <- c("cog", "lel", "psy") # vectors can be named!

### PLOT

# save plot into x and DON'T plot it
# the values saved in x are x-coordinates of the
# mid-point of the individual bars
# we'll use it for drawing lines below
x <- barplot(table(l1_data), plot = F)

# plot orange bars of observed frequencies
barplot(table(l1_data), ylim = c(0, 60),
        main = "Observed vs expected", col = "#ffa733")
# plot semitransparent bars of expected freqs
# in 8-digit colour code, last 2 digits are transparency (between 00 and ff)
barplot(exp, ylim = c(0, 60), col = "#93a1a199", add = T)
# draw lines
for (i in 1:3) { # loop for 3 iterations
  # horizontal lines
  matlines(x[i] - c(.05, -.05), # x-coord is the mid-point of ith bar +- .05
           matrix(rep(c(exp[i], table(l1_data)[i]), each = 2), 2, 2), # y-coord are heights of ith bars
           lwd = 2, lty = 1, col = colors[4])
  # vertical bars
  lines(rep(x[i], 2), c(exp[i], table(l1_data)[i]), lwd = 2, col = colors[4])
}
