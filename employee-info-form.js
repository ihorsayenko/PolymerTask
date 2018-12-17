import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';

/**
 * `employee-info-form`
 * Element that represents employee info test form
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class EmployeeInfoForm extends PolymerElement {
  static get template() {
    return html`
      <style>
        .employee-info-form{
          font: 95% Arial, Helvetica, sans-serif;
          max-width: 400px;
          margin: 10px auto;
          padding: 16px;
          background: #F7F7F7;
        }
        .employee-info-form h1{
          background: #43D1AF;
          padding: 20px 0;
          font-size: 140%;
          font-weight: 300;
          text-align: center;
          color: #fff;
          margin: -16px -16px 16px -16px;
        }
        .employee-info-form input[type="text"],
        .employee-info-form textarea
        {
          -webkit-transition: all 0.30s ease-in-out;
          -moz-transition: all 0.30s ease-in-out;
          -ms-transition: all 0.30s ease-in-out;
          -o-transition: all 0.30s ease-in-out;
          outline: none;
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          width: 100%;
          background: #fff;
          margin-bottom: 4%;
          border: 1px solid #ccc;
          padding: 3%;
          color: #555;
          font: 95% Arial, Helvetica, sans-serif;
        }
        .employee-info-form input[type="text"]:focus,
        .employee-info-form textarea:focus
        {
          box-shadow: 0 0 5px #43D1AF;
          padding: 3%;
          border: 1px solid #43D1AF;
        }
        
        .employee-info-form input[type="submit"]{
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          width: 100%;
          padding: 3%;
          background: #43D1AF;
          border-bottom: 2px solid #30C29E;
          border-top-style: none;
          border-right-style: none;
          border-left-style: none;	
          color: #fff;
        }
        .employee-info-form input[type="submit"]:hover{
          background: #2EBC99;
        }
      </style>

      <iron-form id="employee-info-form">
        <form method="put" action="/form/handler" class="employee-info-form">
          <div>
            <label for="nameInput">Enter your name <span>*</span></label>
            <input id="nameInput" type="text" name="name" value="[[employeeInfo.name]]" required>
          </div>
          <div>
            <label for="positionTextarea">Describe your position</label>
            <textarea id="positionTextarea" name="position" value="[[employeeInfo.position]]">
            </textarea>
          </div>
          <div>
            <label for="dispositionSelect">Select one of:</label>
            <select id="dispositionSelect" name="disposition" value="[[employeeInfo.disposition]]">
              <template is="dom-repeat" items="{{employeeInfo.eDisposition}}">
                <option selected$="{{identifySelectedDisposition(item)}}">[[item]]</option>
              </template>
            </select>
          </div>
          <input type="submit" value="Save"/>
        </form>
      </iron-form>
    `;
  }
  static get properties() {
    return {
      employeeInfo: {
        type: Object
      }
    };
  }

  identifySelectedDisposition(disposition) {
    return disposition == this.employeeInfo.disposition;
  }

  ready() {
    super.ready();
    self = this;
    this.$["employee-info-form"].addEventListener('iron-form-submit', function (event) {
      self.dispatchEvent(new CustomEvent("employee-info-form-save", { detail: event.detail }));
    });
  }
}

window.customElements.define('employee-info-form', EmployeeInfoForm);
