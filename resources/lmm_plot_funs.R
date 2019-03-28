
gg_caterpillar <- function(lmer.model, level,
                           point.colour = "black", point.fill = "orangered", point.size = 3,
                           point.shape = 21, vline.colour = "orangered", vline.size = .5,
                           vline.type = 2, theme = NULL) {
  require(tidyverse)
  
  if (length(level) != 1) stop("One level at a time please! ;)")
  if (base::missing(theme)) {
    theme <- theme(panel.grid = element_blank(),
                   panel.background = element_blank(),
                   strip.background = element_blank(),
                   axis.line = element_line("black", .5, 1))
  } else if (!is.theme(theme)) stop("You need to specify a valid ggplot2 theme.")
    
  
  randoms <- ranef(lmer.model, condVar = T)
  
  if (!level %in% names(randoms)) {
    stop("The value of level you provided is not specified in your model.")
  }
  
  as.data.frame(randoms) %>%
    filter(grpvar == level) %>%
    mutate(grp = factor(grp, levels = grp[order(condval[term == term[1]])])) %>%
    ggplot(aes(x = condval, y = grp)) +
    geom_vline(xintercept = 0, colour = vline.colour, size = vline.size, lty = vline.type) + 
    geom_errorbarh(aes(xmin = condval - 2 * condsd, xmax = condval + 2 * condsd), height = 0) +
    geom_point(colour = point.colour, fill = point.fill, size = point.size, shape = point.shape) + 
    labs(x = "", y = "") + theme + facet_grid(~ term)
}


gg_diag_plot <- function(model, type = "fit_resid", level = NULL,
                         point.colour = "black", point.fill = "black",
                         point.alpha = .6, point.size = 3, point.shape = 21,
                         hline.colour = "orangered", hline.alpha = .6, hline.width = .5, hline.type = 2,
                         smooth.method = "loess", smooth.se = F, smooth.colour = "orangered",
                         smooth.alpha = 1, smooth.width = 1, smooth.type = 1, qq.colour = "orangered",
                         qq.width = .5, qq.type = 1, theme = theme_classic()) {
  require(tidyverse)
  require(qqplotr)
  
  if (class(model) != "lmerMod") stop("This function is for lmer() models.")
  if (!type %in% c("fit_resid", "scale_loc", "qq"))
    stop('"type = " must be either "fit_resid", "scale_loc", or "qq".')
  
  data <- data.frame(fitted = scale(fitted(model)),
                     resid = resid(model))
  
  if (type == "scale_loc") data$resid <- sqrt(abs(data$resid))
  
  if (type != "qq") {
    data %>% ggplot(aes(fitted, resid)) +
      geom_hline(yintercept = 0, colour = hline.colour, alpha = hline.alpha,
                 lwd = hline.width, lty = hline.type) + 
      geom_point(colour = point.colour, fill = point.fill, alpha = point.alpha,
                 size = point.size, shape = point.shape) +
      geom_smooth(method = smooth.method, se = smooth.se, colour = smooth.colour,
                  alpha = smooth.alpha, size = smooth.width, lty = smooth.type) +
      labs(x = "Fitted Values", y = ifelse(type == "fit_resid", "Standardised residuals",
                                   expression(sqrt(abs(Standardised~residuals))))) +
    theme
  } else {
    if (missing(level)) {
      data %>%
        mutate(resid = scale(resid)) %>%
        ggplot(aes(sample = resid)) +
        geom_abline(intercept = 0, slope = 1, alpha = .6, lwd = .5, lty = 2, colour = qq.colour) +
        geom_qq_band(fill = qq.colour, alpha = .2) +
        geom_qq(colour = point.colour, fill = point.fill, alpha = point.alpha,
                size = point.size, shape = point.shape) +
        geom_qq_line(colour = qq.colour, lwd = qq.width, lty = qq.type) +
        labs(x = "Normal quantiles", y = "Standardised model residuals") +
        theme
    } else {
      if (!level %in% names(ranef(model))) {
        stop(paste("The value of level you provided is not specified in your model. Valied values are:\n",
                   paste(names(ranef(ldt.M3)), collapse = "\n ")))
      }
      theme <- if (isTRUE(all.equal.list(theme, theme_classic())))
        theme(panel.grid = element_blank(),
              panel.background = element_blank(),
              strip.background = element_blank(),
              axis.line = element_line("black", .5, 1))
      
      ranef(model)[[level]] %>%
        mutate_all(scale) %>%
        gather(effect, resid) %>%
        ggplot(aes(sample = resid)) +
        geom_abline(intercept = 0, slope = 1, alpha = .6, lwd = .5, lty = 2, colour = qq.colour) +
        geom_qq_band(fill = qq.colour, alpha = .2) +
        geom_qq(colour = point.colour, fill = point.fill, alpha = point.alpha,
                size = point.size, shape = point.shape) +
        geom_qq_line(colour = qq.colour, lwd = qq.width, lty = qq.type) +
        labs(x = "Normal quantiles", y = "Standardised model residuals") +
        theme + facet_wrap(~ effect)
    }
  }
}
