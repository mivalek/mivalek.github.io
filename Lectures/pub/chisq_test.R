
# set random seed to get the same results every time
set.seed(1234)
### define a function that calculates the chi^2 stat
chi_fun <- function(obser, expect) sum((table(obser) - expect)^2/expect)

### DATA
# observed data
l1_data <- rep(c("cog", "lel", "psy"), c(41, 52, 55))
# expected frequencies
exp <- rep(length(l1_data) / length(unique(l1_data)),
           length(unique(l1_data))) # there are 3 unique values
names(exp) <- c("cog", "lel", "psy") # vectors can be named!

# calculate chi^2-statistic
chi <- chi_fun(l1_data, exp)

### simulate smapling distribution of chi^2-statistic

# take 100,000 samples of 148 draws from
# a uniform distribution of the 3 programmes
pop <- replicate(10^5, sample(names(exp), 148, replace = T))
# pop is a matrix with 10^5 columns and 148 rows
# each column is a separate sample

# apply the function to each column of pop to calculate
# chi^2-statistic of every sample
chi_dist <- apply(pop, 2, function(x) chi_fun(x, exp))

### plot it

# save plot into an object when plotting
# pick breaks for bars so that round(chi, 2) lies between
# two bars
x <- hist(chi_dist, breaks = seq(0, 22, by = .275),
          main = "", xlab = expression(chi^2))
# delete the bars that are smaller than observed chi^2
# in the saved plot object
# round the stat to 2 decimal places so the bars colour in nicely
x$counts[x$breaks < round(chi, 2)] <- 0

# overlay the modified plot object on the already plotted histogram
plot(x, add = T, col = "#ffa733")
# add vertical line at the value of observed chi^2
abline(v = chi, lwd = 2, lty = 2, col = "#002b36")

# x and y coordinates of the text labels
text(c(5, 7), c(10000, 3000),
     # labels
     c(expression(Observed~chi^2==2.203),
       expression(chi^2>=Observed~chi^2)),
     # hex codes of colours
     col = c("#002b36", "#ffa733"))

