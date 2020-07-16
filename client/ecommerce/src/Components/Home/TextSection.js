import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  section: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '38px 0',
    textAlign: 'center'
  },
  innerContainer: {
    width: '70%',
    margin: '0 auto'
  },
  sectionText: {
    fontSize: '28px',
    fontWeight: 400,
    lineHeight: 1.5
  },
  heroBtn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px'
  },
  invertedBtn: {
    color: '#3F51B5',
    backgroundColor: 'transparent',
    border: '2px #3F51B5 solid',
    boxShadow: 'none'
  },
  invertedBtnDark: {
    color: '#fff',
    backgroundColor: 'transparent',
    border: '2px #fff solid',
    boxShadow: 'none'
  },
  white: {
    color: '#fff'
  },
  navLink : {
    textDecoration: 'none',
    color : 'white'
  }
})

class TextSection extends Component {
  render () {
    const {
      classes,
      sectionTitle,
      text,
      btnLink,
      btnText,
      textColor,
      bgColor,
      borderColor,
      darkBg,
      padding
    } = this.props

    const ButtonComponent = (
      <Grid item className={classes.heroBtn} xs={12}>
        <Link className={classes.navLink} to={btnLink}>
            {/* TODO: Change the button link to all products page or smth else */}
            <Button
            title={btnText}
            className={darkBg ? classes.invertedBtnDark : classes.invertedBtn}
            color="secondary"
            style={{ width: '192px' }}
            >
            {btnText}
            </Button>
        </Link>
      </Grid>
    )

    return (
      <div
        className={classes.section}
        style={{
          backgroundColor: bgColor,
          borderTop: `2px solid ${borderColor}`,
          borderBottom: `2px solid ${borderColor}`,
          padding: padding
        }}
      >
        <div className={classes.innerContainer}>
          <Typography
            variant="subtitle2"
            gutterBottom
            style={{ color: textColor }}
          >
            {sectionTitle}
          </Typography>

          <Typography
            className={classes.sectionText}
            variant="body1"
            gutterBottom
            style={{ color: textColor }}
          >
            {text}
          </Typography>
          {btnLink && btnText ? ButtonComponent : null}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(TextSection)
