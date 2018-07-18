set.seed(1234)
sdX <- sd(rnorm(5, 5, 2))
set.seed(1234)
meanX <- scale(replicate(10000, mean(rnorm(5, 5, 2))), , F)
ss1 <- replicate(10000, sum(scale(rnorm(5, 0, 1), , F)^2))
ss2 <- replicate(10000, sum(scale(rnorm(15, 0, 1), , F)^2))


hist(ss1, breaks = 50, probability = T)
curve(dchisq(x, 4), col="darkblue", lwd=2, add=TRUE, yaxt="n")

hist(ss2, breaks = 50, probability = T)
curve(dchisq(x, 14), col="darkblue", lwd=2, add=TRUE, yaxt="n")

hist((ss1 / 4) / (ss2 / 14), breaks = 100, probability = T)
curve(df(x, 4, 14), col="darkblue", lwd=2, add=TRUE, yaxt="n")

hist(meanX, breaks = 100, probability = T)
curve(dnorm(x, 0, sdX/sqrt(4)), col="darkblue", lwd=2, add=TRUE, yaxt="n")     
curve(dt(x, df = 4), col = "darkred", lwd = 2, add = T, yaxt = "n")
