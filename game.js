const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame () {
    state = {}
    showTextNode(1)

}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        button.addEventListener('click', () => selectOption(option))
        optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame ()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'Du wachst in einem hell erleuchteten Raum auf. Dieser erinnert dich an ein Thronsaal aus alten Zeiten. Auf diesem Thron sitzt eine Frau die in einen weißen Kleid gehüllt ist. Sie sieht dich mit einem durchdringenden Blick an und sagt. "Bevor ich dich auf deine neue Reise schicken gebe ich dir Liebe mit auf deinen weg, nimmst du sie an ?"',
        options: [
            {
                text: "Du nimmst die Liebe an.",
                setState:{liebe: true},
                nextText: 2
            },
        ]
    },
    {
        id: 2,
        text: 'Du hast die Liebe erhalten was tust du damit?',
        options: [
            {
                text: 'Du trägst die Liebe in dir für dich und deinen weiteren Weg.(Du erhälst "Erleuchtung")',
                requiredState: (currentState) => currentState.liebe,
                setState: {liebe: false, erleuchtung: true},
                nextText: 3
            },
            {
                text: 'Du trägst die Liebe nach Außen um die Menschen in deinem Umfeld zu bereichern.(Du erhälst "Anerkennung")',
                requiredState: (currentState) => currentState.liebe,
                setState: {liebe: false, anerkennung: true},
                nextText: 3
            },
        ]
    },
    {
        id: 3,
        text: 'Du stehst auf einer Waldlichtung. Die Sonne Scheint dir ins Gesicht. Nach ein paar Wimpern schlägen, siehst du deine Umgebung. Hinter dir ist ein Wald der immer dichter wird je weiter du hinein schaust. Vor dir öffnet sich die Lichtung auf ein Weideland. Rechts von dir ist ein kleiner See an dem eine Reh Familie gerade trinkt. Links von dir beginnt ein Trampelpfad welcher einen Berg hinaufführt.',
        options: [
            {
                text: 'Du machst dich auf den Weg durch den dichten Wald.',
                nextText: 4.1
            },
            {
                text: 'Du gehst über das hoch gewachsene Weideland.',
                nextText: 5.1
            },
            {
                text: 'Du gehst zum kleine See hinüber.',
                nextText: 6.1
            },
            {
                text: 'Du nimmst den Trampelpfad auf dem Weg zum Berg.',
                nextText: 7.1
            },
        ]
    },
    {
        id: 3.1,
        text: 'Zurück an der Waldlichtung. Die Sonne ist halb verschunden. Nach ein paar Wimpern schlägen, siehst du deine Umgebung. Hinter dir ist ein Wald der immer dichter wird je weiter du hinein schaust. Vor dir öffnet sich die Lichtung auf ein Weideland. Rechts von dir ist ein kleiner See an dem eine Reh Familie gerade trinkt. Links von dir beginnt ein Trampelpfad welcher einen Berg hinaufführt.',
        options: [
            {
                text: 'Du machst dich auf den Weg durch den dichten Wald.',
                nextText: 4.1
            },
            {
                text: 'Du gehst über das hoch gewachsene Weideland.',
                nextText: 5.1
            },
            {
                text: 'Du gehst zum kleine See hinüber.',
                nextText: 6.1
            },
            {
                text: 'Du nimmst den Trampelpfad auf dem Weg zum Berg.',
                nextText: 7.1
            },
        ]
    },
    //Berg faht 4.1
    {
        id: 4.1,
        text: 'Auf dem Weg durch den Wald triffst du auf eine kleine Hütte. Vor dieser Hütte sitzt ein Mann mittlerne Alters der eine Axt mit einem Schleifstein bearbeitet.',
        options: [
            {
                text: 'Du grüßt den Mann und beginnst eine Unterhaltung mit ihm.',
                nextText: 4.11
            },
            {
                text: 'Du gehst an ihm vorbei tiefer in den Wald.',
                nextText: 4.21
            },
            {
                text: 'Du gehst zurück an den Ort wo du aufgewacht bist.',
                nextText: 3
            },
            
        ]
    },
    {
        id: 4.11,
        text: 'Du erfährst von dem Mann das er sein ganzes Leben in dem Wald als Holzfäller und Förster arbeitet. Er erzählt die das der Wald einer Massiven Bergkette umschlossen ist und das es keinen Weg den Berg hinauf gibt.',
        options: [
            {
                text: 'Du fragst den Holzfäller ob er einer Kletterausrüstung für dich hat.',
                requiredState: (currentState) => currentState.erleuchtung, 
                nextText: 4.12
            },
            {
                text: 'Du fragst den Holzfäller ob du etwas für ihn tuhen kannst.',
                requiredState: (currentState) => currentState.anerkennung,
                nextText: 4.121
            },
        ]
    },
    {
        id: 4.12,
        text: 'Der Holzfäller bittet dich um eine Gegenleistung. Den Stapel Holz vor seine Hütte zu Zerteilen. Oder Fallen für Kleintiere zu überprüfen die im Wald aufgestellt sind.',
        options: [
            {
                text: 'Du zerkleinerst die Holzscheite vor seiner Hütte (Du gewinnst "Stärke").',
                setState: {Stärke: true},
                nextText: 4.13
            },
            {
                text: 'Du überprüfst die Fallen (Du gewinnst "Machanik").',
                setState: {Mechanic: true},
                nextText: 4.13
            },
        
        ]
    },
    {
        id: 4.121,
        text: 'Der Holzfäller bittet dich darum eine der folgeneden Aufgaben zu erledigen im gegenzug bekommst du eine Kletterausrüstung als Lohn. Den Stapel Holz vor seine Hütte zu Zerteilen. Oder ein kleines Gebiet mit jungen Bäumen zu bepflanzen.',
        options: [
            {
                text: 'Du zerkleinerst die Holzscheite vor seiner Hütte (Du gewinnst "Stärke").',
                setState: {Stärke: true},
                nextText: 4.13
            },
            {
                text: 'Du pflanzt junge Bäume (Du gewinnst "Naturkunde").',
                setState: {Naturkunde: true},
                nextText: 4.13
            },
        
        ]
    },
    {
        id: 4.13,
        text: 'Nach Stunden der Arbeit bedankt sich der Holzfäller und überreicht dir die Kletterausrüstung.',
        options: [
            {
                text: 'Du nimmst sie Dankend entgegen, verabschiedest dich von dem Holzfäller und machst dich auf den Weg zur Bergwand (Du erhältst eine "Kletterausrüstung").',
                setState: {Kletterausrüstung: true},
                nextText: 4.14
            },        
        ]
    },
    {
        id: 4.14,
        text: 'Du bist an der Bergwand angekommen was machst du?',
        options: [
            {
                text: 'Du legst die Kletterausrüstung an.',
                nextText: 4.171
            },
            {
                text: 'Du überprüfst die Kletterausrüstung. "Mechanik"',
                requiredState: (currentState) => currentState.Mechanic,
                nextText: 4.161
            },
            {
                text: 'Du überprüfst die Felswand um eine leichte Route zu finden. "Naturkunde"',
                requiredState: (currentState) => currentState.Naturkunde,
                nextText: 4.151
            },                
        ]
    },
    {
        id: 4.151,
        text: 'Du findest einen Pfad hiner einem Busch den den Berg hinauf führt.',
        options: [
            {
                text: 'Du gehst den Pfad endlang freudig der Dinge die du auf dem Berg finden wirst.',
                nextText: 4.152
            },     
        ]
    },
    {
        id: 4.152,
        text: 'Der Pfad führt dich den Berg hinauf auf eine Höhe um über die Baumkronen des Waldes sehen zu können. Du erkennst in der Ferne das Haus am See beim Blick über den Wald. ',
        options: [
            {
                text: 'Du gehst den Pfad weiter am Berg entlang.(Du erhälst die Fähigkeit "Wahrnehmung")',
                setstate: {wahrnehmung: true},
                nextText: 4.153
            },     
        ]
    },
    {
        id: 4.153,
        text: 'Die Sonne taucht langsam am Horizon unter. Du entdekst eine kleine Höhle in der du die Nacht.',
        options: [
            {
                text: 'Du gehst Weiter.',
                nextText: 4.154
            },
            {
                text: 'Du nutzt die Höhle um Schutz für die Nacht zu haben.',
                nextText: 4.155
            },     
        ]
    },
    {
        id: 4.154,
        text: 'Es ist Nacht. Du erreicht ein kleines Platu auf dem ein kleiner Wald steht du siehts die ein Wildschwein laut quikent auf die zu rennt. Du spürst nut noch wie estwas sich tief in deinen Körper eindringt. Du fällst tot um.',
        options: [
            {
                text: 'Reset.',
                nextText: -1
            },   
        ]
    },
    {
        id: 4.155,
        text: 'Die Sonne steht gerade über den Baumkronen und Scheind dir durch den Höhleneingang auf das Gesicht und macht dich wach.',
        options: [
            {
                text: 'Du rappelst dich auf und gehst den Bergpfad weiter. (Du erhälst die Fähigkeit "Nachsicht")',
                setState: {nachtsicht: true},
                nextText: 4.156
            },     
        ]
    },
    {
        id: 4.156,
        text: 'Du erreichst ein kleines Platu auf dem ein kleiner Wald. Du siehst das der Pfad weiter den Berghang entlang führt.',
        options: [
            {
                text: 'Du durchsuchst den kleinen Wald.',
                requiredState: (currentState) => currentState.Naturkunde,
                nextText: 4.157
            },
            {
                text: 'Du gehst den Bergpfad entlang.',
                nextText: 4.1507
            },     
        ]
    },
    //Übergang von Berg in Weide von 4.1 zu 5.1
    {
        id: 4.1507,
        text: 'Der Pfad für herunter vom Berg auf ein großes Weide Feld. Unten siehst du das das Feld auf deiner Kopf höhe angewachsen ist. Auf dem Weg nach unten hast du einen Hof in dem Weideland gesehen.',
        options: [
            {
                text: 'Du siehtst ein großen Hof .',
                nextText: 777
            },     
        ]
    },
    // Ende
    {
        id: 4.157,
        text: 'In dem Walt findest du Fußabdrücke von Wildschweinen. Was tust du?',
        options: [
            {
                text: 'Den Abdrücken folgen.',
                nextText: 4.158
            },
            {
                text: 'Aus dem Wald raus.',
                nextText: 4.156
            },     
        ]
    },
    {
        id: 4.158,
        text: 'Die Spuren führen dich durch den kleinen Wald zu einer Höhle. Was tust du?',
        options: [
            {
                text: 'Ich erkunde die Höhle.',
                requiredState: (currentState) => currentState.Naturkunde,
                nextText: 4.159
            },
            {
                text: 'Ich folgen den Spuren wieder aus dem Wald raus.',
                nextText: 4.156
            },     
        ]
    },
    {
        id: 4.159,
        text: 'Zu anfang der Höhle findest du die Spuren wieder auf matschigem Untergrund in einem großen Höhlenraum. Im hinteren Bereich ist ein schmaler Spalt der weiter in die Höhle hinein führt. Was tust du?',
        options: [
            {
                text: 'Ich zwänge mich durch en schmalen Spalt.',
                nextText: 4.1591
            },
            {
                text: 'Ich erkunde den großen Raum der Höhle um heraus zu finden was für Tiere hier hausen.',
                requiredState: (currentState) => currentState.Naturkunde,
                nextText: 4.1590
            },
            {
                text: 'Ich folgen den Spuren wieder aus dem Wald raus.',
                nextText: 4.156
            },     
        ]
    },
    {
        id: 4.1590,
        text: 'Nach einigen Minuten hast du herausgefunden das hier Wildschweine Hausen. Ein Elternpaar und zwei Jungtiere. Plötzlich hörst du ein Lautes Quiken und Spürst einen dumpfen Schlag, der dich von den Beinen reißt und mit dem Kopf gegen einen Stein schlagen lässt.   ',
        options: [
            {
                text: 'Ende',
                nextText: -1
            },     
        ]
    },
    {
        id: 4.1591,
        text: 'Der spalt öffnet sich zu einem kleine Höhlenpfad der durch den Berg führt. Nach ca einer Stunde Fußmarsch den dunklen Höhlenweg entlang, erscheint licht am ende des Tunnels. ',
        options: [
            {
                text: 'Du tritts in das Licht hinaus und verlässt die Höhle',
                nextText: 4.1592
            },     
        ]
    },
    {
        id: 4.1592,
        text: 'Als du in das licht hinaus trittst befindest du dich am Fuße des Berges. Rechts von die siehst du, in ein paar Metern Entfernung, eine Wege der in die eine Richtung zur Stadt führt und zur anderen den Berg hinauf. Was tust du?',
        options: [
            {
                text: 'Du folgst dem Weg Richtung Stadt.',
                nextText: 4.182
            },
            {
                text: 'Du folgst dem Weg hinauf auf den Berg.',
                nextText: 4.1595
            }, 
        ]
    },
    {
        id: 4.1595,
        text: 'Als du oben angekommen bist siehst du einen Hund vor dir stehen der dich anknurt. Bevor du reagieren kannst springt er dich an und du fällst die Treppe herunter.',
        options: [
            {
                text: 'Ende',
                nextText: -1
            }, 
        ]
    },

    {
        id: 4.161,
        text: 'Du hast die Möglichkeit mit einem Stein und deinen Wissen über Mechanik die Kletterausrüstung zu verbessern.',
        options: [
            {
                text: 'Du verbessert die Kletterausrüstung und legst sie an und machst dich an die Aufsteig.(Du erhälst eine "Verbesserte Kletterausrüstung")',
                setState:{verKletterausrüstung: true, Kletterausrüstung: false},
                nextText: 4.162
            },         
        ]
    },
    {
        id: 4.162,
        text: 'Du vergisst die Zeit da es kaum anstrengung brauchst um mit den verbesserten Kletterausrüstung den Berghang hinauf zu klettern. Als du auf das erste Platu ankommst um du hoch schaust merkst du das du die Bergspitzte erreicht hast. Du lässt den Blick über den Horizont schweifen und fühlst dich Zufrieden. Du schaust den Berg hinunter und siehst zwei Pfade. Der erste Pfad hat einen kleinen Wald. hinter diesem verschwindt der Pfad im Berg und ist nicht weiter zu sehen. Der zweite Pfad ist etwas höher am Berg und führt die Bergspitze entlang soweit du das erkennen kannst.',
        options: [
            {
                text: 'Du kletterst zum Pfad welcher an der Bergspitzte entlang führt.',
                nextText: 4.163
            },
            {
                text: 'Du kletterst den Berg ein Stück weiter runter um in Richtung des kleinen Waldes zu gehen.',
                nextText: 4.164
            },         
        ]
    },
    {
        id: 4.163,
        text: 'Du kletterst den Berg zur Bergspitze hinauf und kommst an einem Pfad an.',
        options: [
            {
                text: 'Du wanders den Pfad entlang.',
                nextText: 4.180
            },         
        ]
    },
    {
        id: 4.164,
        text: 'Du kletterst den Berg hinab und kommst an dem Pfad.',
        options: [
            {
                text: 'Du wanders den Pfad entlang.',
                nextText: 4.153
            },         
        ]
    },
    {
        id: 4.171,
        text: 'Nach dem anlegen der Kletterausrüstung und dem Stundenlangen aufstiegt kommst mit letzter Kraft auf einem bewaldeten Platu an.',
        options: [
            {
                text: 'Du ruhst dich etwas vom antregenden Aufsteig aus und siehst dich auf dem Platu um.',
                nextText: 4.153
            },        
        ]
    },
    {
        id: 4.21,
        text: 'Du verlässt den dichten Wald und stehst vor einer steilen Bergwand. Plötzlich hörst du einen lauten Knall. Ein Steinschlag stürzt auf dich ein.',
        options: [
            {
                text: 'Reset',
                nextText: -1
            },
        ]
    },
    {
        id: 4.180,
        text: 'Du erreichst eine kleine Hütte die auf dem Berghang steht. Du gehts um die Hütte herum und siehst eine in den Berg gehauene Treppe die ins Tal führt.',
        options: [
            {
                text: 'Du schaust über das Tal.',
                nextText: 4.181
            },   
            {
                text: 'Du schaust ob das jemand in der Hütte ist.',
                nextText: 4.190
            },
        ]
    },
    {
        id: 4.182,
        text: 'Was tust du jetzt?',
        options: [
            {
                text: 'Du gehts zur Türe der Hütte zurück.',
                nextText: 4.190
            },
            {
                text: 'Du schaust über das Tal hinter der Hütte.',
                nextText: 4.191
            },
        ]
    },
    {
        id: 4.190,
        text: 'Du stehst vor der Hüttentür. Was tuhst du?',
        options: [
            {
                text: 'Du klopfst an die Türe und rufst "Hallo ist da jemand"?',
                nextText: 4.192
            },
            {
                text: 'Du schaust durch das Fenster in der Türe.',
                requiredState: (currentState) => currentState.nachtsicht, 
                nextText: 4.191
            },
            {
                text: 'Du hörst ob sich was in der Hütte bewegt.',
                requiredState: (currentState) => currentState.wahrnehmung,
                nextText: 4.193
            }, 
            {
                text: 'Du schaust dir die Eingangstüre genauer an. "Mechanik".',
                requiredState: (currentState) => currentState.Mechanic,
                nextText: 4.197
            },  
            {
                text: 'Du entfernst dich von der Türe der Hütte.',
                nextText: 4.180
            },       
        ]
    },
    {
        id: 4.191,
        text: 'Du siehst das inner des Hauses und erkennst ein großen Raum. Durch ein Fenster scheint die Sonne rein und erhellt zum teil den Raum. Die Sonne zeigt eine Kleine Komode die unter dem Fenster zum Vorschein kommt und ein Tisch mit sechs Stühlen in der mitte des Raumes. Außerdem siehst du die Siluette der Küche und des Bettes in unterschiedlichen teilen des Raums. Auf den ersten Blick sind keine Personen zu sehen.',
        options: [
            {
                text: 'Du wendest dich von dem Blick durch das Fenster ab?',
                nextText: 4.190
            },
            {
                text: 'Du schaust dir die Bett genauer an. "Nachsicht".',
                requiredState: (currentState) => currentState.nachtsicht,
                nextText: 4.196
            },   
        ]
    },
    {
        id: 4.192,
        text: 'Du nimmst keine Geräuche aus der Hütte wahr.',
        options: [
            {
                text: 'Du drehst dein Ohr von der Türe ab.',
                nextText: 4.190
            },
            {
                text: 'Du presst dein Ohr an die Türe.',
                nextText: 4.193
            },
        ]
    },
    {
        id: 4.193,
        text: 'Du hörst das Holz er Hütte knacken, den Wind durch die Balken wehen und ein rytmisches ruhiges Geräuch das dich an eine schlafendes Wesen erinnert.',
        options: [
            {
                text: 'Du drehst dein Ohr von der Türe ab.',
                nextText: 4.194
            },
            {
                text: 'Du schaust durch das Fenster in der Türe. "Nachsicht".',
                requiredState: (currentState) => currentState.nachtsicht,
                nextText: 4.196
            },
        ]
    },
    {
        id: 4.194,
        text: 'Du stehst vor der Hüttentür. Was tuhst du?',
        options: [
            {
                text: 'Du klopfst energisch an die Türe und rufst laut "Hallo? Hallo? ist da jemand"?',
                nextText: 4.195
            },
        ]
    },
    {
        id: 4.195,
        text: 'Du hörst ein tippeln auf Holz lauter werdent auf dich zukommend und Plötzlich ertönt laut "Wuff, Wuff , Wuff" und ein lauter Knall an die Türe.',
        options: [
            {
                text: 'Vor Schreck entfernst du dich von der Türe.',
                nextText: 4.181
            },
        ]
    },
    {
        id: 4.196,
        text: 'Du siehst ein Fell artiges Wesen auf dem Bett liegen.',
        options: [
            {
                text: 'Du nimmst den Blick von dem Fenster zurück.',
                nextText: 4.190
            },
        ]
    },
    {
        id: 4.197,
        text: 'DU machst dich am Schloss der Türe zu schaffen. Plötzlich ertönt laut "Wuff, Wuff , Wuff" und ein lauter Knall an die Türe.',
        options: [
            {
                text: 'Vor Schreck entfernst du dich von der Türe.',
                nextText: 4.181
            },
        ]
    },
    {
        id: 4.181,
        text: 'Du siehst unten im Tal eine Stadt mit einer großen Stadtmauer und einer Burg im Zentrum. Um die Stadt herum lebt die Landwirtschaft. Du siehst viele Felder und Weideland mit Nutztieren.',
        options: [
            {
                text: 'Du gehst die in den Berg gehauene Treppe hinab welche ins Tal in die Richtung der Stadt führt.',
                nextText: 4.182
            },         
        ]
    },
    {
        id: 4.182,
        text: 'Dort angekommen folgst du dem Pfad weiter in Richtung Stadt. Der Weg führt dich an den Felder und Höfen der Bauern vorbei und Endet vor dem Stadtor.',
        options: [
            {
                text: 'Ende.',
                nextText: -1
            },         
        ]
    },
    //Weide fahrt 5.1
    {
        id: 5.1,
        text: 'Am Rand des Weidelandes angekommen kannst du nicht in die Ferne schaen das die Pflanzen höher als du gewachsen sind.',
        options: [
            {
                text: 'Du gehst in das Feld hinein.',
                nextText: 5.2
            },         
        ]
    },

]

startGame()