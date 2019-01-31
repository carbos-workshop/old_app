const axios = require('axios');

const KEY = 'vzczNNHVi5' //TODO
const reportAll = 'https://reportallusa.com/api/parcels.php?'

//TEMP TO SAVE API CALLS
let response = [{
            "parcel_id": "115640001",
            "county_id": "6065",
            "rausa_id": "303880",
            "county_name": "Riverside",
            "muni_name": "Corona",
            "state_abbr": "CA",
            "addr_number": "1950",
            "addr_street_name": "LUCY",
            "addr_street_type": "Ln",
            "physcity": "CORONA",
            "physzip": "92879",
            "census_zip": "92879",
            "owner": "CARTER DEBORAH",
            "mail_address1": "420 N MCKINLEY ST NO 183",
            "mail_address3": "CORONA  CA 92879",
            "mkt_val_land": "230874.00",
            "mkt_val_bldg": "403922.00",
            "bldg_sqft": "4093",
            "land_use_code": "R1",
            "land_use_class": "Residential",
            "story_height": "2.00",
            "muni_id": "1935063",
            "school_dist_id": "609850",
            "acreage_deeded": "0.5000",
            "acreage_calc": "0.50",
            "latitude": "33.8922160551138",
            "longitude": "-117.532032061814",
            "geom_as_wkt": "MULTIPOLYGON(((-117.531945172839 33.8918986017753,-117.532442458435 33.8922506057312,-117.532438548345 33.89225312618,-117.532434623989 33.8922556323492,-117.532430026533 33.8922585358216,-117.532424749359 33.8922618276488,-117.532420113403 33.8922646864351,-117.532416123097 33.8922671193478,-117.53241145087 33.8922699379331,-117.532405751371 33.8922733305642,-117.532398337141 33.8922776739543,-117.532392577123 33.8922809950764,-117.532388495485 33.8922833198298,-117.532384399529 33.8922856266977,-117.532377888197 33.8922892467469,-117.53237203566 33.8922924525089,-117.53236719717 33.8922950672299,-117.532361992392 33.8922978434902,-117.53235537198 33.892301324907,-117.532350475054 33.892303862688,-117.532345207421 33.8923065557422,-117.532339217047 33.8923095789872,-117.532334263886 33.8923120425103,-117.532329297421 33.8923144836294,-117.532324311139 33.892316900608,-117.532319311565 33.8923192960839,-117.532314294337 33.8923216673972,-117.53230998325 33.8923236825429,-117.532305658926 33.892325679792,-117.53229879001 33.8923288058138,-117.532292620644 33.8923315685227,-117.532287524843 33.8923338171196,-117.5322824114 33.8923360424553,-117.532275450608 33.8923390233567,-117.5322692004 33.8923416561595,-117.532264037049 33.892343796353,-117.532259599764 33.8923456117314,-117.532253295231 33.892348153126,-117.532246970749 33.8923506613652,-117.532240627331 33.8923531319305,-117.532235014409 33.8923552848482,-117.532230511643 33.8923569854905,-117.532224494574 33.8923592255012,-117.532219215741 33.892361159506,-117.532214679627 33.8923627982785,-117.53221013568 33.8923644190988,-117.532204821284 33.89236628765,-117.532198733024 33.8923683922458,-117.532193395142 33.8923702078421,-117.532188808867 33.8923717443441,-117.532184213679 33.892373262905,-117.532178840222 33.8923750121461,-117.532172303046 33.8923771006074,-117.532166520812 33.8923789162516,-117.53216188431 33.8923803459756,-117.53215724107 33.8923817586379,-117.532152588888 33.8923831515562,-117.532146375488 33.892384981539,-117.532140927011 33.8923865557331,-117.532136249023 33.8923878849009,-117.532130388434 33.8923895192209,-117.532123735939 33.8923913392797,-117.532119030997 33.8923926002006,-117.532114318221 33.8923938431694,-117.532109598681 33.8923950672734,-117.532104082831 33.8923964717519,-117.532098559042 33.8923978510662,-117.532093816964 33.8923990131894,-117.53208708681 33.8924006257699,-117.532080344246 33.8924022033143,-117.532074784243 33.8924034730021,-117.532069213045 33.8924047166576,-117.532062837479 33.89240610741,-117.532057250349 33.8924072971315,-117.532051655253 33.8924084598861,-117.532045251293 33.8924097580626,-117.532039640252 33.8924108659816,-117.532034021259 33.8924119478352,-117.532027188869 33.8924132260605,-117.532019541798 33.892414611817,-117.532013092085 33.8924157400559,-117.532006634313 33.8924168350174,-117.532000167388 33.8924178958111,-117.531992478875 33.8924191106843,-117.531984373221 33.892420337949,-117.531978287533 33.8924212244273,-117.531971381347 33.8924221905462,-117.531964469223 33.8924231206611,-117.531957548922 33.8924240093852,-117.531949805693 33.8924249597423,-117.531944096267 33.8924256277768,-117.531939198147 33.8924261792983,-117.531933479355 33.8924267987411,-117.531926938624 33.8924274734955,-117.531920394159 33.8924281149281,-117.531913843784 33.8924287221597,-117.531908109211 33.8924292245533,-117.531903191694 33.8924296338174,-117.531897039529 33.8924301179519,-117.531889244221 33.8924306892599,-117.531884318048 33.8924310246796,-117.531879389407 33.8924313393873,-117.531872241565 33.8924317543877,-117.531866321266 33.8924317591896,-117.531861178129 33.8924313115274,-117.531855276797 33.8924299628121,-117.531849099699 33.8924276558036,-117.531843631037 33.892424634666,-117.531839672267 33.892421654849,-117.531834966366 33.8924166910272,-117.531831768559 33.8924117198574,-117.531829668244 33.8924065372768,-117.53182864821 33.8924015158284,-117.531790434258 33.8923985301806,-117.531790414278 33.8923670334083,-117.531790434604 33.8923629119231,-117.531790476421 33.8923589281646,-117.531790537825 33.8923548062582,-117.531790623024 33.8923506850095,-117.531790764532 33.8923453964952,-117.531790906168 33.8923410700016,-117.5317910649 33.8923369498022,-117.53179130267 33.8923316639074,-117.53179158608 33.8923261737799,-117.531791845751 33.8923217135388,-117.531792190675 33.8923163625308,-117.53179257016 33.8923110823958,-117.531792904357 33.8923067638457,-117.531793247002 33.8923026516784,-117.531793720625 33.8922973768896,-117.531794132719 33.8922930620488,-117.531794550045 33.8922889554271,-117.53179500428 33.8922847122833,-117.531795622046 33.8922792412681,-117.531796112958 33.8922751393016,-117.531796584085 33.8922713819544,-117.531797299272 33.8922659189565,-117.531798114428 33.892260050109,-117.531798896658 33.8922546612575,-117.531799654157 33.8922497216633,-117.531800167583 33.8922464868185,-117.531800832826 33.8922424029001,-117.531801543665 33.8922381850754,-117.531802229344 33.8922342406976,-117.531802961741 33.8922301651068,-117.531803653772 33.8922264316415,-117.531804467562 33.8922221568611,-117.531805495537 33.8922169367967,-117.531806390688 33.8922125340546,-117.531807497805 33.8922072554754,-117.531808405807 33.8922030644807,-117.531809579023 33.8921977960431,-117.531810815716 33.8921924331868,-117.531812136004 33.8921868738233,-117.53181366703 33.8921806487113,-117.531814815338 33.8921761108362,-117.53181620976 33.8921707400514,-117.531817282395 33.8921667159705,-117.531818377809 33.8921626970657,-117.531819732336 33.892157846921,-117.53182102484 33.8921533364191,-117.531822235822 33.892149163055,-117.531823371781 33.8921453276636,-117.531824581044 33.8921413310334,-117.531825813087 33.8921373395793,-117.53182702553 33.8921334853715,-117.531828663823 33.8921283762589,-117.531830029371 33.8921242004083,-117.531831352521 33.8921202287571,-117.531832742994 33.8921161301897,-117.531834567946 33.8921108487582,-117.531835962707 33.892106894405,-117.531837378085 33.8921029452501,-117.531838769554 33.8920991342872,-117.53184027721 33.8920950642714,-117.531842251922 33.8920898209753,-117.531843710676 33.8920860273547,-117.531845676646 33.8920809978306,-117.531848349158 33.8920743192233,-117.53185040577 33.8920692779504,-117.531852158817 33.892065059357,-117.531854295249 33.8920600055446,-117.531856018949 33.8920559964264,-117.531858273748 33.8920508314035,-117.531860354251 33.8920461640551,-117.531862755137 33.8920408613905,-117.531865119645 33.892035731307,-117.531867007348 33.89203169977,-117.531869271409 33.8920269430828,-117.531871348659 33.8920226418229,-117.531874473517 33.8920162858627,-117.531876440538 33.892012354493,-117.531878296789 33.8920086830222,-117.531880176955 33.8920050203223,-117.531882205936 33.8920011117591,-117.53188485404 33.8919960779449,-117.531886799436 33.8919924398212,-117.531888902336 33.8919885584501,-117.531890917265 33.8919848700246,-117.531893456322 33.891980286332,-117.531895117712 33.8919773309371,-117.531896960538 33.8919740689364,-117.531900700544 33.8919675651146,-117.531903407555 33.8919629337174,-117.531905869649 33.8919587763754,-117.531909286645 33.891953096334,-117.531911064417 33.8919501884328,-117.531913034514 33.8919469792236,-117.531916165932 33.8919419485673,-117.531918580935 33.8919381171906,-117.531921469128 33.8919336020465,-117.531924109656 33.891929521315,-117.531927267898 33.891924696853,-117.531929662442 33.8919210910893,-117.531932075495 33.8919174941518,-117.531934508125 33.8919139051282,-117.531937745951 33.8919091988629,-117.531941001444 33.8919045176616,-117.531943279259 33.891901280953,-117.531945172839 33.8918986017753)))"
        },
        {
          "parcel_id": "2075-17-3-09-005",
          "county_id": "8005",
          "rausa_id": "47357",
          "county_name": "Arapahoe",
          "muni_name": "Southwest Arapahoe",
          "state_abbr": "CO",
          "addr_number": "5757",
          "addr_street_prefix": "S",
          "addr_street_name": "IVANHOE",
          "addr_street_type": "St",
          "census_zip": "80111",
          "owner": "ECKERMAN MARGARET T",
          "mail_address1": "5757 S IVANHOE ST",
          "mail_address3": "GREENWOOD VILLAGE CO 80111-1519",
          "trans_date": "2016-03-14",
          "sale_price": "0.00",
          "mkt_val_land": "580800.00",
          "mkt_val_tot": "929200.00",
          "bldg_sqft": "2714",
          "ngh_code": "550",
          "land_use_code": "1212",
          "land_use_class": "Residential",
          "muni_id": "1935575",
          "school_dist_id": "802910",
          "acreage_calc": "0.93",
          "latitude": "39.6123598015732",
          "longitude": "-104.921698900218",
          "geom_as_wkt": "MULTIPOLYGON(((-104.921298536263 39.6125972845498,-104.92130044769 39.6120259701034,-104.921992613112 39.6120376089511,-104.921992324116 39.6124785821555,-104.921991460977 39.6126050156913,-104.921298536263 39.6125972845498)))"
      }

      ]
//END TEMP

//location required. Can be county, state, or zip code. Can be a combination of city,state.
export function getParcelByOwnerName(firstname, lastname, location ){
  return axios.get(`${reportAll}v=3&return_buildings=true&client=${KEY}&region=${location}&owner=${lastname} ${firstname}`)
}

//location required. Can be county, state, or zip code. Can be a combination of city,state.
export function getParcelByAddress(street, location){
  return new Promise( (resolve,reject) => {resolve({data: {results: response} })}) //TEMP
  //return axios.get(`${reportAll}v=3&return_buildings=true&client=${KEY}&region=${location}&address=${street}`)
}