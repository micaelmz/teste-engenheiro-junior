import flagAcre from '../assets/img/flags_brazil/Bandeira_do_Acre.svg.png';
import flagAlagoas from '../assets/img/flags_brazil/225px-Bandeira_de_Alagoas.svg.png';
import flagAmapa from '../assets/img/flags_brazil/Bandeira_do_Amapá.svg.png';
import flagAmazonas from '../assets/img/flags_brazil/Bandeira_do_Amazonas.svg.png';
import flagBahia from '../assets/img/flags_brazil/Bandeira_da_Bahia.svg.png';
import flagCeara from '../assets/img/flags_brazil/Bandeira_do_Ceará.svg.png';
import flagDistritoFederal from '../assets/img/flags_brazil/Bandeira_do_Distrito_Federal.svg.png';
import flagEspiritoSanto from '../assets/img/flags_brazil/Bandeira_do_Espírito_Santo.svg.png';
import flagGoias from '../assets/img/flags_brazil/Flag_of_Goiás.svg.png';
import flagMaranhao from '../assets/img/flags_brazil/Bandeira_do_Maranhão.svg.png';
import flagMatoGrosso from '../assets/img/flags_brazil/Bandeira_de_Mato_Grosso.svg.png';
import flagMatoGrossoSul from '../assets/img/flags_brazil/Bandeira_de_Mato_Grosso_do_Sul.svg.png';
import flagMinasGerais from '../assets/img/flags_brazil/Bandeira_de_Minas_Gerais.svg.png';
import flagPara from '../assets/img/flags_brazil/Bandeira_do_Pará.svg.png';
import flagParaiba from '../assets/img/flags_brazil/Bandeira_da_Paraíba.svg.png';
import flagParana from '../assets/img/flags_brazil/Bandeira_do_Paraná.svg.png';
import flagPernambuco from '../assets/img/flags_brazil/Bandeira_de_Pernambuco.svg.png';
import flagPiaui from '../assets/img/flags_brazil/Bandeira_do_Piauí.svg.png';
import flagRioJaneiro from '../assets/img/flags_brazil/Bandeira_do_estado_do_Rio_de_Janeiro.svg.png';
import flagRioGrandeNorte from '../assets/img/flags_brazil/Bandeira_do_Rio_Grande_do_Norte.svg.png';
import flagRioGrandeSul from '../assets/img/flags_brazil/Bandeira_do_Rio_Grande_do_Sul.svg.png';
import flagRondonia from '../assets/img/flags_brazil/Bandeira_de_Rondônia.svg.png';
import flagRoraima from '../assets/img/flags_brazil/Bandeira_de_Roraima.svg.png';
import flagSantaCatarina from '../assets/img/flags_brazil/Bandeira_de_Santa_Catarina.svg.png';
import flagSaoPaulo from '../assets/img/flags_brazil/Bandeira_do_estado_de_São_Paulo.svg.png';
import flagSergipe from '../assets/img/flags_brazil/Bandeira_de_Sergipe.svg.png';
import flagTocantins from '../assets/img/flags_brazil/Bandeira_do_Tocantins.svg.png';
import axios from 'axios';

const ENDPOINT = 'http://127.0.0.1:8000/api/clients';

export const ClientService = {
  async getData() {
    try {
      const response = await axios.get(ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Error fetching clients data:', error);
      throw error;
    }
  },

  async create(clientObj) {
    try {
      const { id, ...body } = clientObj;
      const states = this.getBrazilianStates();
      const state = states.find(state => state.name === body.state_name);
      body.state_code = state ? state.code : null;
      body.status = "active";
      const response = await axios.post(`${ENDPOINT}/`, body);
      return response.data;
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  },

  async update(clientObj){
    try {
      const {id, ...body } = clientObj;
      const response = await axios.put(`${ENDPOINT}/${id}`, body);
      return response.data;
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  },

  async delete(id){
    try {
      const response = await axios.delete(`${ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  },

  async search(query) {
    try {
      const response = await axios.get(`${ENDPOINT}/search`, {
        params: {
          query: query
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching clients:', error);
      throw error;
    }
  },

  getCustomersSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },

  getCustomersMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },

  getCustomersLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },

  getCustomersXLarge() {
    return Promise.resolve(this.getData());
  },

  getBrazilianStates() {
    return [
      {name: 'Acre', code: 'AC'},
      {name: 'Alagoas', code: 'AL'},
      {name: 'Amapá', code: 'AP'},
      {name: 'Amazonas', code: 'AM'},
      {name: 'Bahia', code: 'BA'},
      {name: 'Ceará', code: 'CE'},
      {name: 'Distrito Federal', code: 'DF'},
      {name: 'Espírito Santo', code: 'ES'},
      {name: 'Goiás', code: 'GO'},
      {name: 'Maranhão', code: 'MA'},
      {name: 'Mato Grosso', code: 'MT'},
      {name: 'Mato Grosso do Sul', code: 'MS'},
      {name: 'Minas Gerais', code: 'MG'},
      {name: 'Pará', code: 'PA'},
      {name: 'Paraíba', code: 'PB'},
      {name: 'Paraná', code: 'PR'},
      {name: 'Pernambuco', code: 'PE'},
      {name: 'Piauí', code: 'PI'},
      {name: 'Rio de Janeiro', code: 'RJ'},
      {name: 'Rio Grande do Norte', code: 'RN'},
      {name: 'Rio Grande do Sul', code: 'RS'},
      {name: 'Rondônia', code: 'RO'},
      {name: 'Roraima', code: 'RR'},
      {name: 'Santa Catarina', code: 'SC'},
      {name: 'São Paulo', code: 'SP'},
      {name: 'Sergipe', code: 'SE'},
      {name: 'Tocantins', code: 'TO'}
    ]
  },

  getBrazilianStateFlag(state) {
    switch (state.toUpperCase()) {
      case 'AC':
        return flagAcre;
      case 'AL':
        return flagAlagoas;
      case 'AP':
        return flagAmapa;
      case 'AM':
        return flagAmazonas;
      case 'BA':
        return flagBahia;
      case 'CE':
        return flagCeara;
      case 'DF':
        return flagDistritoFederal;
      case 'ES':
        return flagEspiritoSanto;
      case 'GO':
        return flagGoias;
      case 'MA':
        return flagMaranhao;
      case 'MT':
        return flagMatoGrosso;
      case 'MS':
        return flagMatoGrossoSul;
      case 'MG':
        return flagMinasGerais;
      case 'PA':
        return flagPara;
      case 'PB':
        return flagParaiba;
      case 'PR':
        return flagParana;
      case 'PE':
        return flagPernambuco;
      case 'PI':
        return flagPiaui;
      case 'RJ':
        return flagRioJaneiro;
      case 'RN':
        return flagRioGrandeNorte;
      case 'RS':
        return flagRioGrandeSul;
      case 'RO':
        return flagRondonia;
      case 'RR':
        return flagRoraima;
      case 'SC':
        return flagSantaCatarina;
      case 'SP':
        return flagSaoPaulo;
      case 'SE':
        return flagSergipe;
      case 'TO':
        return flagTocantins;
      default:
        return null;
    }
  }
};