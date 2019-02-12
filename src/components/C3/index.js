import React from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { Identicon } from 'ethereum-react-components';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Web3 from 'web3'
import LeafletMap from '../map'
import C3 from '../../abis/C3.json'
import {
  getParcelByPoint
} from '../../c3/requests'
import {
  trimDecimals
} from '../../util/utils.js'

const styles = theme => ({
  card: {
    // maxWidth: 400,
  },
  disabled: {
    color:theme.palette.text.disabled,
  },
  forceRight: {
    marginLeft: 'auto',
    padding: `0px ${theme.spacing.unit * 2}px`,
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
    // marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  progress: {
    width: '48px !important',
    height: '48px !important',
    margin: theme.spacing.unit * 2,
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  etherscanLink: {
    color: theme.palette.primary.main
  },
});

class C3Card extends React.Component {
  state = {
    expanded: false,
    loading: true,
    loadingMap: true,
    geometry: "",
  };

  componentWillMount(){
    // let web3 = new Web3(window.web3.currentProvider)
    // let c3 = new web3.eth.Contract(C3.abi, this.props.address)
    // console.log('c3 -->', c3);
    let web3 = new Web3(window.web3.currentProvider)
    let c3 = new web3.eth.Contract(C3.abi, this.props.address)
    this.getC3Info(c3, this.props.address).then( res => {
      //TODO get reportall shape from esriGeometryPoint
      this.setState({
        totalCarbon: web3.utils.fromWei(res.totalCarbon),
        buyableCarbon: web3.utils.fromWei(res.buyableCarbon),
        aboveGroundCarbon: web3.utils.fromWei(res.aboveGroundCarbon),
        belowGroundCarbon: web3.utils.fromWei(res.belowGroundCarbon),
        hectares: web3.utils.fromWei(res.hectares),
        latitude: web3.utils.fromWei(res.latitude),
        longitude: web3.utils.fromWei(res.longitude),
        ppt: web3.utils.fromWei(res.ppt),
        geometryHash: res.geometryHash,
        description: res.description,
        ownerAddress: res.ownerAddress,
        contractState: res.contractState,
        loading: false
      })
    })
  }

  //TODO BatchRequest this
  getC3Info = async(c3, address) => {
    let State = await c3.methods.currentState().call()
    return {
      totalCarbon: await c3.methods.totalCarbon().call(),
      buyableCarbon: await c3.methods.buyableCarbon().call(),
      aboveGroundCarbon: await c3.methods.aboveGroundCarbon().call(),
      belowGroundCarbon: await c3.methods.belowGroundCarbon().call(),
      geometryHash: await c3.methods.geometryHash().call(),
      hectares: await c3.methods.hectares().call(),
      latitude: await c3.methods.latitude().call(),
      longitude: await c3.methods.longitude().call(),
      ppt: await c3.methods.ppt().call(),
      description: await c3.methods.description().call(),
      ownerAddress: await c3.methods.ownerAddress().call(),
      contractState: (State == 0 ? "Awaiting Endorsement" : "Verified")
    }
  }

  handleExpandClick = () => {
    //get geometry and then set loadingMap to false
    if (!this.state.geometry.length > 0) {
      getParcelByPoint(this.state.latitude, this.state.longitude)
        .then( res => {
          if (!res.data.results || res.data.results.length > 2) {
            console.error('Error with Reportall API query', res)
          }
          this.setState({
            expanded: !this.state.expanded,
            loadingMap: false,
            geometry: res.data.results[0].geom_as_wkt,
          })
        }).catch(console.log)
    } else {
      this.setState({expanded: !this.state.expanded,})
    }
  };

  render() {
    const { classes } = this.props;
    const contractInfoRows = [
        { name: "Above Ground Carbon", value: trimDecimals(this.state.aboveGroundCarbon, 6) },
        { name: "Below Ground Carbon", value: trimDecimals(this.state.belowGroundCarbon, 6) },
        { name: "Total Carbon", value: trimDecimals(this.state.totalCarbon, 6) },
        { name: "Total Buyable Carbon", value: trimDecimals(this.state.buyableCarbon, 6) },
        { name: "Hectares", value: trimDecimals(this.state.hectares, 6) },
        { name: "ETH Price Per Ton", value: this.state.ppt },
        { name: "Geometry Hash", value: this.state.geometryHash },
    ]

    const subheader = (
      <div>
        <Typography color="primary" variant="subtitle2">{this.state.contractState}</Typography>
        <Typography variant="subtitle2">{this.state.ppt * this.state.buyableCarbon} <span className="ether-sign">Ξ</span></Typography>
      </div>
    )
    return (
      <Card className={classes.card}>
        {
          this.state.loading
          ?
          <CircularProgress className={classes.progress} />
          :
          <CardHeader
            avatar={
              <Avatar component={()=>(
                <Identicon size="medium" address={this.props.address} />
              )}/>
            }
            title={<Typography variant="h5">{this.state.description}</Typography>}
            subheader={subheader}
          />
        }
        <CardActions className={classes.actions} disableActionSpacing>
          <Button>
            <a className={classes.etherscanLink} target="_blank" rel="noopener noreferrer" href={`https://rinkeby.etherscan.io/address/${this.props.address}`}>View on Etherscan</a>
          </Button>
          <Typography className={classnames([classes.forceRight, classes.disabled])} variant="button">View Details</Typography>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            disabled={this.state.loading}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          > <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          {
            this.state.loadingMap
            ?
            <LinearProgress />
            :
            <CardMedia
              className={classes.media}
              image=" "
              component={()=>(
                <LeafletMap data={{}} geometry={this.state.geometry} center={[this.state.latitude, this.state.longitude]}/>
              )}
            />
          }
          <CardContent>
            <Table className={classes.table}>
              <TableBody>
                {contractInfoRows.map( (row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

C3Card.propTypes = {
  classes: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired
};

export default withStyles(styles)(C3Card);
