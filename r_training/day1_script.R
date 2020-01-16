
### in RStudio CONSOLE we run commands by pressing Enter
### in RStudio script editor (e.g., right here where you're looking)
### we run commands by pressing Ctrl+Enter (Windows) or Cmd+Enter (MacOS)

# if you want to know what each of these lines does, either run it by
# navigating to it and pressing Ctrl/Cmd+Enter, or type/copy it into
# console and press Enter

# assignment
x <- 1 # assigns the value (a one-element numerical vector of length) of 1 to variable/object x
x <- x + 1 # re-assigns the value x + 1 to x so that x is now 2
y <- x * 2 # assigns x times 2 to object y

# data structures

## vectors
## created by c()
vec1 <- c(1, 2, 5, 7) # numeric vector of length 4
vec2 <- c("a", "$", "1") # character vector of length 3
vec3 <- c(T, T, F, T, F, F) # logival vector of length 6

vec4 <- 10:7 # numeric vector of length 4 including a sequence of integers from 10 to 7

# we can do maths with NUMERIC vectors
vec1 + vec4

# don't have to be same length
vec1 + 1:2 # R recycles
vec1 + c(1, 3, 5) # gives warning but still runs it

# length
length(vec1)

## lists
## created by list()
list1 <- list(
  vec1,
  vec2,
  vec3)

## Notice that IN SCRIPT, commands can be broken across multiple lines
## provided none of the individual lines can be interpreted as a complete command

## can be named
list2 <- list(
  list_element = list1,
  vector_element = vec4
)

## matrices
## created with matrix()
mat1 <- matrix(data = c(1:30), ncol = 6)
# dimensions
dim(mat1)
# rows
nrow(mat1)
# columns
ncol(mat1)

## data frame
## created with data.frame() or tibble()
df <- data.frame(
  id = as.character(1:100),
  age = round(rnorm(n = 100, mean = 40, sd = 8)),
  iq = rnorm(n = 100, mean = 100, sd = 15),
  pass = sample(x = c(T, F), size = 100, replace = T)
)
## 2 dimensions
dim(df)
nrow(df)
ncol(df)
# names columns = variables
names(df)

# subsetting
## using names - $
df$age

age_of_sample <- df$age

list2$list_element

# we can add columns of data frames
df$age_z <- scale(df$age) # scale() z-transforms age

## indexing
mat1[1, ] # 1st row
mat1[ , 1] # 1st column
df$age[2] # 2nd element of vector df$age
df$age[c(2, 5, 10)] # multiple elements of df$age

mat1[c(3, 5), 2:3] # 2nd and 3rd col, 3rd and 5th row of mat1

df[1:10, c(2,5)] # first 10 rows of cols 2 and 5
df[1:10, c("age", "age_z")] # can use names but in character vectors

## logical subsetting
### logic in R
TRUE & TRUE # and
TRUE | FALSE # or
xor(T, T) # exclusive or

# ! negation
# == comparison

1 == 1 # is 1 equal to 1?
1 == "d"  

!1 == 1 # ! negates expression
1 != 1 # not equal

1 < 4 # is 1 smaller than 4?
5.7 >= -12 # is 5.7 larger than or equal to -12? 

# logical operators join statements
1 < 4 & 5.7 >= -12

## logical subsetting
## using logical vectors of same length as object we're subsetting
length(vec1)
vec1[c(T, T, F, T)]

## conditional logical subsetting
mean(df$age) # what is mean age
df$age < mean(df$age) # is age < mean age
df[df$age < mean(df$age), ] # only give rows of df for which age < mean age

df2 <- df[1:30, ]

df2[df2$age < mean(df$age), ]
age_of_sample <- df$age
df[age_of_sample < mean(age_of_sample), ]

## you can assign values (e.g., NA) to subsets!
df2[df2$age < mean(df$age), ] <- NA
df2$age[is.na(df2$age)] <- mean(df$age)

## subsetting lists
list1[1] # accesses 1st element of a list, where there's a vector
list1[[1]] # accesses the vector itsef
list1[[1]][2] # when we use [[]], the element (here, vector) can be then subsetted the usual way

# functions

## Argument matching
mean(x = df$age) # all arguments to functions have names
sd(df$age) # but we don't HAVE TO use names, if we enter arguments in the right order
scale(df$age, TRUE, FALSE) # centre age around its mean but don't scale it by its SD
scale(x = df$age, center = TRUE, scale = FALSE) # the above, just fully typed out
scale(df$age, FALSE, TRUE) # NOT the same.. here, we scale by sd but don't centre by mean
scale(x = df$age, scale = F, center = T) # IF NAMED, arguments can be entered in any order

var(df$age)
hist(df$age, main = "My pretty wee histogram",
     xlab = "Age", ylab = "N", col = "red",
     breaks = 15)

# arguments MUST BE seperated with commas
# everything separated by commas is arguments
df[c(1, 45), 3] # rows 1 and 45 of column 3
df[1, c(45, 3)] # row 1 of columns 45 and 3


## packages
install.packages("car") # you only do this once
library(car) # do this once per session
library(psych)

## basic descriptives
desc <- describe(mtcars)

# What is the class of desc?
class(desc)

# Ask R to give you number of rows of desc
nrow(desc)

# What are the names of variables in desc?
names(desc)

# only keep vars, mean, sd, min, and max
desc <- desc[ , c("vars", "mean", "sd", "min", "max")]

# let's ask R to print out the mean column
desc$mean # $ notation
desc[["mean"]] # names list way
desc[ , 2] # indexing
desc[ , "mean"] # 2-dimensional subsetting using name
desc[ , names(desc) == "mean"] # logical subsetting

# Let's replace values of "sd" of rows that have "mean" values larger than 100 with NA

desc[desc$mean > 100, "sd"] <- NA

# let's calculate mean and SD of the "sd" column
mean(desc$sd, na.rm = TRUE)
sd(desc$sd, na.rm = T)
