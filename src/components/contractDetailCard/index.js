import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/SendTwoTone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import {
  trimDecimals
} from '../../util/utils.js'
import {
  getEthPricePerTon,
} from '../../c3/requests'
import convert from '../../c3/conversions'

import { Identicon } from 'ethereum-react-components';
import LeafletMap from '../map'

const styles = theme => ({
  card: {
    // maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  number:{
    color:theme.palette.primary.main,
  },
  rightIcon:{
    marginLeft: theme.spacing.unit,
  }
});

let id = 0;
function createData(title, biomass, soil, total ) {
  id += 1;
  return {
    id,
    title,
    biomass,
    soil,
    total
  };
}

class ContractDetailCard extends React.Component {
  state = {
    expanded: false,
    price: 0,
    ppt: 0,
    ratio: 0,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  componentWillMount(){
    getEthPricePerTon()
      .then( ratio => {
        convert.etherToUsd(ratio)
          .then(usdRatio=>{
            this.setState({
              price: ratio * this.props.c3.carbon.total,
              ppt: ratio,
              usdppt: usdRatio,
            })
          })
      })
  }

  render() {
    const { classes } = this.props;

    const rows = [
      createData('Carbon (Tons)', trimDecimals(this.props.c3.carbon.aboveGround, 6), trimDecimals(this.props.c3.carbon.belowGround, 6), trimDecimals(this.props.c3.carbon.total,6) ),
      createData('ETH', this.props.c3.carbon.aboveGround * this.state.ppt, this.props.c3.carbon.belowGround * this.state.ppt, this.state.price ),
      createData('USD', trimDecimals(this.props.c3.carbon.aboveGround * this.state.usdppt, 2), trimDecimals(this.props.c3.carbon.belowGround * this.state.usdppt, 2), trimDecimals(this.props.c3.carbon.total * this.state.usdppt, 2))
    ];

    const subheader = (
      <div>
        <Typography variant="subtitle2">
          {`${trimDecimals(this.props.c3.carbon.total, 6)} tons`}
        </Typography>
        <Typography variant="subtitle2">
          {`${trimDecimals(this.state.price, 6)} Ξ`}
        </Typography>
      </div>
    )

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar component={()=>(
              <Identicon size="medium" address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />
            )}/>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={<Typography variant="h5">Carbon Conservation Contract ({this.props.c3.description})</Typography>}
          subheader={subheader}
        />
        <CardMedia
          className={classes.media}
          image=" "
          component={()=>(
            <LeafletMap data={this.props.property} geometry={this.props.property.geom_as_wkt} center={[this.props.property.latitude, this.props.property.longitude]}/>
          )}
        />
        <CardContent>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Unit of Value</TableCell>
                <TableCell align="right">Above Ground (Biomass)</TableCell>
                <TableCell align="right">Below Ground (Soil)</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.biomass}</TableCell>
                  <TableCell align="right">{row.soil}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h6">
              Optional Configuration
            </Typography>
          </CardContent>
        </Collapse>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button
            variant="contained"
            color="primary"
          >
            Submit
           <SendIcon className={classes.rightIcon} />
          </Button>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

ContractDetailCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ContractDetailCard);
