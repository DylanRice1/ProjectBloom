import sqlite3
from kivy.app import App
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.textinput import TextInput
from kivy.uix.popup import Popup

class VolunteeringApp(App):
    def build(self):
        # creates a box layout
        layout = BoxLayout(orientation='vertical', spacing=10, padding=10)

        self.titleLabel = Label(text="New Post")
        
        # create the inputs for the new projet
        self.projNameInput = TextInput(multiline=False, hint_text="Project Name")
        self.descInput = TextInput(multiline=True, hint_text="Description")
        self.locationInput = TextInput(multiline=False, hint_text="Location")
        self.endDateInput = TextInput(multiline=False, hint_text="End Date")
        self.numVolsInput = TextInput(multiline=False, hint_text="Number of Volunteers")
        self.projTypeInput = TextInput(multiline=False, hint_text="Project Type")

        # creates the button and defines a command for when the button is pressed
        button = Button(text="Post")
        button.bind(on_press=self.onButtonPress)

        # adds the elements to the app
        layout.add_widget(self.titleLabel)

        layout.add_widget(self.projNameInput)
        layout.add_widget(self.descInput)
        layout.add_widget(self.locationInput)
        layout.add_widget(self.endDateInput)
        layout.add_widget(self.numVolsInput)
        layout.add_widget(self.projTypeInput)

        layout.add_widget(button)

        # connects to the database
        self.conn = sqlite3.connect('bloom_version1.1.db')

        # creating a popup for if the data is entered successfully
        self.successPopup = Popup(title='Success', content=Label(text='Data entered successfully!'), size_hint=(None, None), size=(400, 200))

        return layout
    
    def onButtonPress(self, instance):
        # sets variables as the inputed text
        projName = self.projNameInput.text
        desc = self.descInput.text
        location = self.locationInput.text
        endDate = self.endDateInput.text
        numVols = int(self.numVolsInput.text)
        projType = self.projTypeInput.text

        # uses previously written self.conn to connect to the database
        # uses an sql statement to insert the new project into the table in the database
        with self.conn:
            cursor = self.conn.cursor()
            try:
                cursor.execute('''
                                INSERT INTO Projects 
                                (title, description, location, endDate, positions, type)
                                VALUES (?, ?, ?, ?, ?, ?)
                            ''', (projName, desc, location, endDate, numVols, projType))
            except sqlite3.Error as e:
                print("SQLite error:", e)
                errorPopup = Popup(title='Error', content=Label(text=f'Database error: {e}'), size_hint=(None, None), size=(400, 200))
                errorPopup.open()

        # clear the input boxes once the data has been entered into the db    
        self.projNameInput.text = ""
        self.descInput.text = ""
        self.locationInput.text = ""
        self.endDateInput.text = ""
        self.numVolsInput.text = ""
        self.projTypeInput.text = ""

        # a popup is shown to tell the user the entry was successfull
        self.successPopup.open()

    # closes the connection to the db when the app is closed
    def on_stop(self):
        self.conn.close()

if __name__ == '__main__':

    VolunteeringApp().run()