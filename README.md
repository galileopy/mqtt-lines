# mqtt-line
Takes a file F and an interval X and publishes each line of the file as one message to a mqtt broker, every X milliseconds

Publishes a file line by line to one or more mqtt topics -t, making sure just
one line is sent every -i milliseconds                                        

`npm install mqtt-lines`

Options:

  **-t, --topic string[]**    MQTT topics, mandatory, --topic ONE TWO or --topic=ONE --topic=TWO

  **-f, --file string**       Message file, mandatory, each message must be delimited by a new line

  **-h, --host string**       MQTT host, defaults to mqtt://127.0.0.1

  **-u, --username string**   MQTT username, optional

  **-P, --password string**   MQTT password, optional

  **-p, --port number**       MQTT port, defaults to 1883

  **-i, --interval number**   Wait i milliseconds between publishing, defaults to 500ms

  **-q, --qos number**        MQTT QoS value for each message, defaults to 0

  **-r, --retain**            If set, will send messages with the retain flag "on"

  **-v, --verbose**          Shows verbose output


Project home: https://github.com/galileopy/mqtt-line
