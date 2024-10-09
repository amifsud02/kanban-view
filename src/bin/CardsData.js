import { v4 as uuidv4 } from "uuid";
export const cardsData = [
  {
    id: 0,
    title: "All open flights",
    components: [
      {
        id: uuidv4(),
        flightType: 'Open',

        FilghtNumber: 'F-784',
        ArrivalDate: "29 Nov",
        DepartureDate: "30 Nov",
        ArrivalTitle: "Arrival services",
        ArrivalServices: [
          {
            id: uuidv4(), name: 'Foods', status: "In progress"
          },
          {
            id: uuidv4(), name: 'Beverages', status: "In progress"
          },
          {
            id: uuidv4(), name: 'Towing'
            , status: "Confirmed"
          },
          {
            id: uuidv4(), name: 'Parking'
            , status: "Confirmed"
          },
        ],
        EventServices: [
          { id: uuidv4(), name: 'Event 1', status: "In progress" },
          { id: uuidv4(), name: 'Event 2', status: "Confirmed" },
        ],
        DepartureTitle: "Departure services",
        DepartureServices: [
          { id: uuidv4(), name: 'Services 1', status: "In progress" },
          { id: uuidv4(), name: 'Services 2', status: "Confirmed" },
        ]
      },

      {
        id: uuidv4(),
        FilghtNumber: 'F-333',
        ArrivalDate: "29 Nov",
        flightType: 'Open',

        DepartureDate: "30 Nov",
        ArrivalTitle: "Arrival services",
        EventServices: [
          { id: uuidv4(), name: 'Slot', status: "In progress" },
          { id: uuidv4(), name: 'Drinks', status: "Confirmed" },
        ],
        ArrivalServices: [
          { id: uuidv4(), name: 'Food', status: "In progress" },
          { id: uuidv4(), name: 'Beverages', status: "Confirmed" },
        ],
        DepartureTitle: "Departure services",
        DepartureServices: [
          { id: uuidv4(), name: 'Services 1', status: "In progress" },
          { id: uuidv4(), name: 'PPR', status: "Confirmed" }
        ]
      },
     
    ]
  },

  {
    id: 1,
    title: "To Be Actioned",
    components: [
      {
        id: uuidv4(),
        FilghtNumber: 'F-222EN',
        ArrivalDate: "20 Oct",
        DepartureDate: "22 Oct",
        ArrivalTitle: "Arrival services",
        ArrivalServices: [],
        EventServices: [
          // { id: uuidv4(), name: 'Event 1' },
          { id: uuidv4(), name: 'Event 2' },
          { id: uuidv4(), name: 'Event 3' }
        ],
        DepartureTitle: "Departure services",
        DepartureServices: [],
      },
      {
        id: uuidv4(),
        FilghtNumber: 'F-123',
        ArrivalDate: "18 Oct",
        DepartureDate: "21 Oct",
        ArrivalTitle: "Arrival services",
        ArrivalServices: [
          { id: uuidv4(), name: 'Food' },
          { id: uuidv4(), name: 'Beverages' },
        ],
        EventServices: [
          { id: uuidv4(), name: 'Event 1' },
          { id: uuidv4(), name: 'Event 2' },
          { id: uuidv4(), name: 'Event 3' }
        ],
        DepartureTitle: "Departure services",
        DepartureServices: [],
      },
    ]
  },
  {
    id: 2,
    title: "Awaiting Confirmation",
    components: [

    ]
  },
  {
    id: 3,
    title: "Confirmed",
    components: [
      {
        id: uuidv4(),
        FilghtNumber: 'F-235',
        ArrivalDate: "4 Oct",
        DepartureDate: "7 Oct",
        ArrivalTitle: "Arrival services",
        EventServices: [],
        ArrivalServices: [
          { id: uuidv4(), name: 'Kettle' },
          { id: uuidv4(), name: 'Transport' },
          { id: uuidv4(), name: 'Drinks' },
          { id: uuidv4(), name: 'Parking' },
          { id: uuidv4(), name: 'Slot' },
          { id: uuidv4(), name: 'PPR' }
        ],
        DepartureTitle: "Departure services",
        DepartureServices: [
          { id: uuidv4(), name: 'Services 3' },
          { id: uuidv4(), name: 'Services 4' },
          { id: uuidv4(), name: 'Services 5' },
          { id: uuidv4(), name: 'Services 6' }
        ]
      },
      {
        id: uuidv4(),
        FilghtNumber: 'F-395',
        ArrivalDate: "19 Oct",
        DepartureDate: "22 Oct",
        ArrivalTitle: "Arrival services",
        ArrivalServices: [
          { id: uuidv4(), name: 'TV' }
        ],
        EventServices: [],
        DepartureTitle: "Departure services",
        DepartureServices: []
      },
    ]
  },
  {
    id: 4,
    title: "Completed",
    components: [
      {
        id: uuidv4(),
        FilghtNumber: 'F-568',
        ArrivalDate: "29 Nov",
        DepartureDate: "30 Nov",
        ArrivalTitle: "Arrival services",
        ArrivalServices: [
          { id: uuidv4(), name: 'Kettle' },
          { id: uuidv4(), name: 'Transport' },
          { id: uuidv4(), name: 'Drinks' },
          { id: uuidv4(), name: 'Parking' },
          { id: uuidv4(), name: 'Slot' },
          { id: uuidv4(), name: 'PPR' }
        ],
        EventServices: [
          { id: uuidv4(), name: 'Event 4' },

        ],
        DepartureTitle: "Departure services",
        DepartureServices: [
          { id: uuidv4(), name: 'Services 3' },
          { id: uuidv4(), name: 'Services 4' },
          { id: uuidv4(), name: 'Services 5' },
          { id: uuidv4(), name: 'Services 6' }
        ]
      },
      {
        id: uuidv4(),
        FilghtNumber: 'F-953',
        ArrivalDate: "29 Nov",
        DepartureDate: "30 Nov",
        ArrivalTitle: "Arrival services",
        ArrivalServices: [
          { id: uuidv4(), name: 'TV' },
          { id: uuidv4(), name: 'Kettle' },
          { id: uuidv4(), name: 'Transport' },
          { id: uuidv4(), name: 'Drinks' },
          { id: uuidv4(), name: 'Towing' },
          { id: uuidv4(), name: 'Parking' },
          { id: uuidv4(), name: 'Slot' }
        ],
        EventServices: [],
        DepartureTitle: "Departure services",
        DepartureServices: [
          { id: uuidv4(), name: 'Food' },
          { id: uuidv4(), name: 'Beverages' },
          { id: uuidv4(), name: 'TV' },
          { id: uuidv4(), name: 'Kettle' },
          { id: uuidv4(), name: 'Transport' },
          { id: uuidv4(), name: 'Drinks' },
          { id: uuidv4(), name: 'Towing' },
          { id: uuidv4(), name: 'Parking' },
          { id: uuidv4(), name: 'Slot' }
        ]
      },
    ]
  }
]
