<metadata-json>
{
    "id": "1greP9HQ0RxFhb2N0OqqkBvTgFH",
    "title": "Effective Jackson with annotations in Spring Boot",
    "date": "2019-02-16T09:08:00.463Z",
    "category": "technology",
    "status": "default",
    "tags": [ "java", "spring-boot", "jackson", "code-generation" ] 
}
<metadata-json>


With the current craze about micro-services I spend a considerable amount of time dealing with Rest API's. They mostly send and receive data in JSON format. That is where Jackson comes in handy. In this article I'll show some code examples of some non trivial use cases of Jackson I came across.

## Technology Versions:
- Java 8
- Spring Boot: 1.5.7 Release
- Jackson: 2.8.10
- Lombok: I use lombok annotations check out their website if the code confuses you:  Thank me later ;)

I prefer using annotations instead of custom deserializers and manual json building because it reduces the amount of code I need  write which in turn makes my code easier to maintain and reduces the room for errors.

## Changing property name between serializing and deserializing
In API to API communication sometimes the Json I receive has errors or doesn't exactly match the output I need I can customise how properties of my Model are deserialized and serialized. This allows me to map Json objects in a single model without the need to create two separate models and mapping the manually. 

```
// java //
//
// In this example we change how object is serialized and deserialized using only  
// annotations. Use of WRITE_ONLY allows to specify that this annotation only
// applies when deserializing from json. Using an annotation on a getter
// also signifies that it only applies when serializing.


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder()
@Getter()
@EqualsAndHashCode()
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor()
@NoArgsConstructor()
public class DeserializeSerializeDifferently {
   private Integer channelID;
   
   //Deserialize from json as 'code'
   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   private String code;
   
   //Deserialize from json as 'shortName'
   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   private String shortName;
   private Integer bitValue;

   //Serialize to json as 'name'
   @JsonProperty(value = "name", access = JsonProperty.Access.READ_ONLY)
   public String getName() {
      return this.shortName;
   }

   //Serialize to json as 'value'
   @JsonProperty(value = "value", access = JsonProperty.Access.READ_ONLY)
   public String getValue() {
      return this.code;
   }
}
```

## Easy Dates parsing and formatting
On many occasions the date format between the API talking to each other isn't matching. Jackson can help you abstract away the pain of having to parse the dates manually. 

```
// java //
//
// Sometimes you need to map your dates into different formats.
// This setup allows doing this without any additional setup.

@Builder()
@EqualsAndHashCode()
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor()
@NoArgsConstructor()
public class ParseDate {
   private static final SimpleDateFormat DESERIALIZE_PARSER =
      new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
   private static final SimpleDateFormat SERIALIZE_FORMATTER =
      new SimpleDateFormat("yyyy-MM-dd");

   // Disable default parser
   @JsonIgnore()
   private Date date;

   // Create custom deserializer
   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   public void setDate(String date) throws ParseException {
      this.date =  DESERIALIZE_PARSER.parse(date);
   }

   // Disable default serializer
   @JsonIgnore
   public Date getDate() {
      return this.date;
   }

   // Create custom serializer 
   @JsonProperty(value = "date", access = JsonProperty.Access.READ_ONLY)
   public String getAsStringDate() {
      return SERIALIZE_FORMATTER.format(this.date);
   }
}
```

I hope you find these examples useful. For the full code with tests click here.
