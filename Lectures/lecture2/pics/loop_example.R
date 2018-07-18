
# mock data
data <- data.frame(id = rep(1:3, each = 5),
                   cond = rep(c(1,2,3,3,3), 3),
                   item = rep(c("A", "A", "A", "B", "C"), 3))

# list of items to keep for each participant
keep <- data.frame(id = 1:3, keep_item = LETTERS[1:3])

# see what it looks like
data

data2 <- data

# loop through all participants in the keep data.frame
for (i in keep$id) {
  # which item to keep for ith participant
  keep_this <- keep[keep$id == i, "keep_item"]
  data2 <-
    # keep the rows for which it is NOT true that
    # cond is 3 AND id is i AND item is NOT equal to keep_this
    data2[!(data2$cond == 3 & data2$id == i & data2$item != keep_this), ]
}

# this is what we get
data2
