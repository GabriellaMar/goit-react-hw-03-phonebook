import { Component } from "react";
import { ContactForm } from './ContactForm/ContactForm'
import { nanoid } from 'nanoid'
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

export class App extends Component {
  state = {
    contacts: [
      //   {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      // {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      // {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      // {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
   
    filter: '',
  }
componentDidMount(){
  const storageContacts = localStorage.getItem('contacts');
  const parsedContacts = JSON.parse(storageContacts);
  if(parsedContacts){
    this.setState({contacts: parsedContacts})
  }
}

  componentDidUpdate(prevProps, prevState){
    if(this.state.contacts !== prevState.contacts){
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }
  
   addUserContact =({name, number})=>{
     const userContact = {
         name,
         number,
       id: nanoid()
     }
   
   this.setState(prevState => ({
       contacts: [...prevState.contacts, userContact],
     }));
   }

  deleteUserContact= contactId=>{
    this.setState({
      contacts: this.state.contacts.filter(contact=>contact.id !== contactId)
    })
  }
  
   handleFilterChange = (event) => {
     this.setState({
       filter: event.target.value
     });
   }
  
  render() {

    const { contacts, filter } = this.state;
    const filteredContacts =contacts.filter(contact =>
      contact.name && contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  return (
    <div>
   <h1>Phonebook</h1>

   <ContactForm contacts={contacts} addUserContact={this.addUserContact} />

   <h1>Contacts</h1>

   <Filter filter ={filter} onFilterChange={this.handleFilterChange}/>
  
   <ContactList filteredContacts ={filteredContacts}  onDeleteContact={this.deleteUserContact}/>
    </div>
  )
}
}

