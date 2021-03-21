import { Router } from 'express';
import { sequelize, Op } from '../models/IndexModel';



// put your business logic using method sequalize
const readAddressMethod = async (req, res) => {
    const address = await req.context.models.address.findAll(
    // {
    //   include: [{
    //       model: req.context.models.address
    //   }]
    // }

  );
    return res.send(address); 
}

//filter pencarian data dengan primary key
const findAddressMethod = async (req, res) => {
    const address = await req.context.models.address.findByPk(
      req.params.addressId,
    //   {
    //     include: [{
    //         model: req.context.models.address
    //     }]
    //   }
    );
    return res.send(address);
};


//tambah data
const addAddressMethod = async (req, res) => {
    const { addr_address,
            addr_optional,
            addr_is_primary,
            addr_langitude,
            addr_latitude,
            addr_kodepos,
            addr_accu_id} = req.body;
    const address = await req.context.models.address.create({
            addr_address : addr_address,
            addr_optional : addr_optional,
            addr_is_primary : addr_is_primary,
            addr_langitude : addr_langitude,
            addr_latitude : addr_latitude,
            addr_kodepos : addr_kodepos,
            addr_accu_id : addr_accu_id,
    });
    return res.send(address);
};



//ubah data
// Change everyone without a last name to "Doe"
const editAddressMethod = async (req, res) => {
    const { addr_address,
            addr_optional,
            addr_is_primary,
            addr_langitude,
            addr_latitude,
            addr_kodepos,
            addr_accu_id} = req.body;
    const address =  await req.context.models.address.update({    
            addr_address : addr_address,
            addr_optional : addr_optional,
            addr_is_primary : addr_is_primary,
            addr_langitude : addr_langitude,
            addr_latitude : addr_latitude,
            addr_kodepos : addr_kodepos,
            addr_accu_id : addr_accu_id
     }, {
        where: { addr_id : req.params.addressId }
          });
        return res.sendStatus(200);
  };

  const editPrimary = async (req, res) => {
    const { 
            addr_is_primary,
            addr_accu_id} = req.body;
    const address =  await req.context.models.address.update({    
            
            addr_is_primary : addr_is_primary,
            addr_accu_id : addr_accu_id
     }, {
        where: { addr_id : req.params.addressId }
          });
        return res.sendStatus(200);
  };

//hapus data
const deleteAddressMethod = async (req, res) => {
    const result = await req.context.models.address.destroy({
      where: { addr_id: req.params.addressId },
    });
  
    return res.send(true);
  };


  // ======ambil address
  const AddressRest = async (req, res) => {
    const fullAddress = await sequelize.query(
      // 'select p.prov_name, c.city_name,k.kec_name,o.kodepos from province p join city c on p.prov_id = c.city_prov_id join kecamatan k on c.city_id = k.kec_city_id join kodepos o on k.kec_id = o.kodepos_kec_id where kodepos= :acco_id group by city_id, prov_name,kec_name,kodepos'
      'select p.prov_name, c.city_name,k.kec_name,o.kodepos, a.addr_address, t.acco_nama, t.acco_phone  from province p join city c on p.prov_id = c.city_prov_id join kecamatan k on c.city_id = k.kec_city_id join kodepos o on k.kec_id = o.kodepos_kec_id join address a on o.kodepos = a.addr_kodepos join account t on a.addr_accu_id = t.acco_id where t.acco_id= :acco_id group by city_id, prov_name,kec_name,kodepos,addr_id,acco_id'
      ,
      { replacements: { acco_id: req.params.id }, type: sequelize.QueryTypes.SELECT }
    );
    return res.send(fullAddress);
  };


// Gunakan export default agar semua function bisa dipakai di file lain.
export default{
    readAddressMethod,
    findAddressMethod,
    addAddressMethod,
    deleteAddressMethod,
    editAddressMethod,
    AddressRest,
    editPrimary
}