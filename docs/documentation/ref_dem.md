###

[User manual](user_manual.md)
┊ [Previous](cfddem_simulation.md)
┊ [Next](ref_domain.md)

-------

### ContactModel

This class represents a contact model.

#### Constructor

##### `ContactModel(label='')`

Creates a new instance of the `ContactModel` class.

- `label` (string, optional): A string label for the contact model. Default is an empty string.

#### Attributes

##### `label`

A string label for the contact model.

#### Methods

##### `SetProperty(json_data)`

Set the properties of the contact model from a JSON object.

- `json_data` (JSON object): A JSON object containing the properties to set.

##### `SetProperty(prop_name, prop_value)`

Set a specific property of the contact model.

- `prop_name` (string): The name of the property to set.
- `prop_value` (float): The value to set for the property.

-------

[User manual](user_manual.md)
┊ [Previous](cfddem_simulation.md)
┊ [Next](ref_domain.md)