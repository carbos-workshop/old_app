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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Slider from '@material-ui/lab/Slider';
import { connect } from 'react-redux'
import logo from '../../img/logo@2x.png'
import {
  updateC3PricePerTon,
  encounteredC3ApiError,
} from '../../c3/c3Actions'
import {
  trimDecimals
} from '../../util/utils.js'
import {
  getUsdPricePerTon,
  getEthExchangeRate
} from '../../c3/requests'
import convert from '../../c3/conversions'

// import { Identicon } from 'ethereum-react-components';
import LeafletMap from '../map'

const styles = theme => ({
  card: {
    // maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  disabled: {
    color:theme.palette.text.disabled,
  },
  actions: {
    display: 'flex',
  },
  carbosAvatar:{
    width: 60,
    height: 60,
  },
  // avatarImg:{
  //   objectFit: 'contain'
  // },
  forceRight: {
    marginLeft: 'auto',
    padding: `0px ${theme.spacing.unit * 2}px`,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  explaination:{
    margin: theme.spacing.unit,
    // textAlign: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  number:{
    color:theme.palette.primary.main,
  },
  // rightIcon:{
  //   marginLeft: theme.spacing.unit,
  // },
  sliderWrapper: {
    width: '60%',
    margin: '0 auto'
  },
  slider: {
    padding: `${theme.spacing.unit * 2}px 0px`,
  },
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

const mapDispatchToProps = (dispatch) => {
  return {
    onC3PricePerTonUpdate: ppt => {
      dispatch(updateC3PricePerTon(ppt))
    },
    setApiError: status => {
      dispatch(encounteredC3ApiError(status))
    }
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

class ContractDetailCard extends React.Component {
  state = {
    expanded: false,
    price: 0,
    ppt: 0,
    usdppt: 0,
    ratio: 0,
    pptModifier: 0,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  componentWillMount(){
    getEthExchangeRate()
      .then( res => {
        if(!res.data[0]){this.props.setApiError(true)} //api error catch
        let ethExchangeRate = res.data[0].price_usd
        getUsdPricePerTon()
          .then( usdppt => {
            let ethppt =  convert.usdToEther(usdppt, ethExchangeRate)
            this.setState({
              price: ethppt * this.props.c3.carbon.total,
              ppt: ethppt,
              usdppt: usdppt,
            })
            this.props.onC3PricePerTonUpdate(ethppt)
          }).catch(err => {
            console.error(err)
            this.props.setApiError(true)
          })
      }).catch(err => {
        console.error(err)
        this.props.setApiError(true)
      })
  }

  changePpt = (e, value) => {
    this.setState({
      pptModifier: value,
    });
    this.props.onC3PricePerTonUpdate(this.state.ppt * (1 + (value/100))) //store new ETH PPT in redux store
  };

  getModifiedPricePerTon = type => {
    switch(type){
      case 'USD':
        return this.state.usdppt * (1 + (this.state.pptModifier/100))
      case 'ETH':
        return this.state.ppt * (1 + (this.state.pptModifier/100))
      default:
        return 0
    }
  }


  render() {
    const { classes } = this.props;

    const CarbosAvatar = withStyles({
      img: {
        objectFit: 'contain',
      },
    })(Avatar);


    const contractValueRows = [
      createData('Carbon (Tons)',
        trimDecimals(this.props.c3.carbon.aboveGround, 6),
        trimDecimals(this.props.c3.carbon.belowGround, 6),
        trimDecimals(this.props.c3.carbon.total,6) ),
      createData('ETH',
        this.props.c3.carbon.aboveGround * this.getModifiedPricePerTon('ETH'),
        this.props.c3.carbon.belowGround * this.getModifiedPricePerTon('ETH'),
        this.props.c3.carbon.total * this.getModifiedPricePerTon('ETH')),
      createData('USD',
      trimDecimals(this.props.c3.carbon.aboveGround * this.getModifiedPricePerTon('USD'), 2),
      trimDecimals(this.props.c3.carbon.belowGround * this.getModifiedPricePerTon('USD'), 2),
      trimDecimals(this.props.c3.carbon.total * this.getModifiedPricePerTon('USD'), 2))
    ];

    const subheader = (
      <div>
        <Typography variant="subtitle2">
          {`${trimDecimals(this.props.c3.carbon.total, 6)} tons`}
        </Typography>
        <Typography variant="subtitle2">
          {`${this.props.c3.carbon.total * this.getModifiedPricePerTon('ETH')} `}<span className="ether-sign">Ξ</span>
        </Typography>
      </div>
    )

    // <Avatar component={()=>(
    //   <Identicon size="medium" address="" />
    // )}/>

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <CarbosAvatar className={classes.carbosAvatar} src={logo}/>
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
              {contractValueRows.map(row => (
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
            <Typography className={classes.explaination} variant="subtitle1">
              You have the option to price your carbon tonnage above the standard rate.
              <br/>
              <strong>We do not recommend doing this</strong>, but this is your contract.
            </Typography>
            <div className={classes.sliderWrapper}>
              <Typography id="label">Price Per Ton</Typography>
              <Slider
                aria-labelledby="label"
                classes={{ container: classes.slider }}
                value={this.state.pptModifier}
                onChange={this.changePpt}
              />
            </div>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Unit of Value</TableCell>
                  <TableCell align="right">Price Per Ton</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      ETH
                    </TableCell>
                    <TableCell align="right">{this.getModifiedPricePerTon('ETH')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      USD
                    </TableCell>
                    <TableCell align="right">{trimDecimals(this.getModifiedPricePerTon('USD'),2)}</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Collapse>
        <CardActions className={classes.actions} disableActionSpacing>
          <Typography className={classnames([classes.forceRight, classes.disabled])} variant="button">Additional Configuration</Typography>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          > <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

ContractDetailCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ContractDetailCardWrapper = connect(
  mapStateToProps,
  mapDispatchToProps)(withStyles(styles)(ContractDetailCard))

export default ContractDetailCardWrapper
