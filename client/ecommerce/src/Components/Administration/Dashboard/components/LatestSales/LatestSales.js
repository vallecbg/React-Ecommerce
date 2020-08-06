import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import palette from "../../../../../theme/palette";
import { options } from "./chart";

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: "relative",
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const LatestSales = (props) => {
  const { className, orders, ...rest } = props;

  const classes = useStyles();

  function parseDate(diff) {
    let currentDate = new Date();

    return `${
      currentDate.getDate() + diff
    } ${currentDate.toLocaleString("default", { month: "short" })}`;
  }

  function renderOrderCount(diff) {
    return orders.filter(function (el) {
      let orderDate = new Date(el.createdOn);
      let searchDate = new Date();
      searchDate.setDate(searchDate.getDate() + diff);
      if (
        orderDate.getFullYear() === searchDate.getFullYear() &&
        orderDate.getMonth() === searchDate.getMonth() &&
        orderDate.getDate() === searchDate.getDate()
      ) {
        return el;
      }
    });
  }

  const data = {
    labels: [
      parseDate(-3),
      parseDate(-2),
      parseDate(-1),
      parseDate(0),
      parseDate(1),
      parseDate(2),
    ],
    datasets: [
      {
        label: "This year",
        backgroundColor: palette.primary.main,
        data: [renderOrderCount(-3).length, renderOrderCount(-2).length, renderOrderCount(-1).length, renderOrderCount(0).length, renderOrderCount(1).length, renderOrderCount(2).length, renderOrderCount(3).length],
      },
    ],
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Latest Sales" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string,
};

export default LatestSales;
