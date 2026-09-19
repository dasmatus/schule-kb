<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\ArticleRevision;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin user
        $admin = User::create([
            'username' => 'admin',
            'email' => 'admin@mattwiki.local',
            'password_hash' => bcrypt('admin123'),
            'is_admin' => true,
        ]);

        // Regular user
        $user = User::create([
            'username' => 'editor',
            'email' => 'editor@mattwiki.local',
            'password_hash' => bcrypt('editor123'),
            'is_admin' => false,
        ]);

        // Categories
        $mathCategory = Category::create(['name' => 'Mathematik', 'slug' => 'mathematik']);
        $physicsCategory = Category::create(['name' => 'Physik', 'slug' => 'physik']);
        $csCategory = Category::create(['name' => 'Informatik', 'slug' => 'informatik']);
        $chemistryCategory = Category::create(['name' => 'Chemie', 'slug' => 'chemie']);
        $biologyCategory = Category::create(['name' => 'Biologie', 'slug' => 'biologie']);

        // Sample articles
        $articles = [
            [
                'title' => 'Einführung in die lineare Algebra',
                'slug' => 'einfuehrung-lineare-algebra',
                'content' => "# Einführung in die lineare Algebra\n\nDie lineare Algebra ist ein fundamentales Gebiet der Mathematik, das sich mit Vektorräumen und linearen Abbildungen beschäftigt.\n\n## Vektoren\n\nEin Vektor ist ein mathematisches Objekt, das sowohl eine Richtung als auch eine magnitude (Länge) hat. Vektoren werden oft als Pfeile im Raum dargestellt.\n\n### Beispiel\n\nEin Vektor im zweidimensionalen Raum kann als `(x, y)` geschrieben werden, zum Beispiel `(3, 4)`.\n\n## Matrizen\n\nEine Matrix ist eine rechteckige Anordnung von Zahlen. Matrizen werden verwendet, um lineare Transformationen darzustellen.\n\n### Matrixmultiplikation\n\nDie Multiplikation zweier Matrizen A und B ist nur möglich, wenn die Spaltenzahl von A gleich der Zeilenzahl von B ist.\n\n## Anwendungen\n\nLineare Algebra wird in vielen Bereichen angewendet:\n\n- Computergrafiken\n- Maschinenlernen\n- Physik-Simulationen\n- Kryptographie\n\n## Zusammenfassung\n\nDie lineare Algebra bildet die Grundlage für viele moderne Technologien und ist ein essentielles Werkzeug für jeden Mathematikstudenten.",
                'status' => 'published',
                'featured' => true,
                'category_id' => $mathCategory->id,
                'author_id' => $admin->id,
            ],
            [
                'title' => 'Newtons Gesetze der Bewegung',
                'slug' => 'newtons-gesetze',
                'content' => "# Newtons Gesetze der Bewegung\n\nIsaac Newton formulierte im 17. Jahrhundert drei fundamentale Gesetze der klassischen Mechanik.\n\n## Erstes Gesetz: Trägheitsprinzip\n\nEin Körper bleibt in Ruhe oder bewegt sich mit konstanter Geschwindigkeit weiter, sofern keine äußere Kraft auf ihn wirkt.\n\n## Zweites Gesetz: Kraft = Masse × Beschleunigung\n\nDie Beschleunigung eines Körpers ist proportional zur wirkenden Kraft und umgekehrt proportional zur Masse des Körpers.\n\n**Formel:** F = m × a\n\n## Drittes Gesetz: Actio = Reactio\n\nKräfte treten immer paarweise auf. Übt Körper A eine Kraft auf Körper B aus, so übt Körper B eine gleich große, aber entgegengesetzte Kraft auf Körper A aus.\n\n## Bedeutung\n\nDiese Gesetze bilden die Grundlage der klassischen Mechanik und sind bis heute gültig für die meisten alltäglichen physikalischen Berechnungen.",
                'status' => 'published',
                'featured' => true,
                'category_id' => $physicsCategory->id,
                'author_id' => $admin->id,
            ],
            [
                'title' => 'Datenstrukturen: Arrays und Listen',
                'slug' => 'datenstrukturen-arrays-listen',
                'content' => "# Datenstrukturen: Arrays und Listen\n\nDatenstrukturen sind fundamentale Bausteine in der Informatik, die festlegen, wie Daten organisiert und gespeichert werden.\n\n## Arrays\n\nEin Array ist eine Sammlung von Elementen, die unter einem einzigen Variablennamen gespeichert sind. Jedes Element kann über einen Index angesprochen werden.\n\n### Eigenschaften\n\n- Feste Größe (in den meisten Sprachen)\n- Schneller Zugriff über Index: O(1)\n- Homogene Datentypen\n\n## Linked Lists\n\nEine Linked List ist eine lineare Datenstruktur, bei der jedes Element (Knoten) einen Verweis auf das nächste Element enthält.\n\n### Vorteile gegenüber Arrays\n\n- Dynamische Größe\n- Effizientes Einfügen und Löschen: O(1)\n- Kein zusammenhängender Speicher nötig\n\n### Nachteile\n\n- Langsamer Zugriff: O(n)\n- Höherer Speicherbedarf durch Zeiger\n\n## Wann welche Struktur verwenden?\n\n| Verwendung | Empfohlene Struktur |\n|------------|-------------------|\n| Häufiger Indexzugriff | Array |\n| Häufiges Einfügen/Löschen | Linked List |\n| Unbekannte Größe | Linked List |",
                'status' => 'published',
                'featured' => false,
                'category_id' => $csCategory->id,
                'author_id' => $user->id,
            ],
            [
                'title' => 'Das Periodensystem der Elemente',
                'slug' => 'periodensystem',
                'content' => "# Das Periodensystem der Elemente\n\nDas Periodensystem ist eine tabellarische Anordnung der chemischen Elemente, geordnet nach ihrer Ordnungszahl.\n\n## Aufbau\n\nDas Periodensystem besteht aus:\n\n- **Perioden**: Horizontale Reihen (1-7)\n- **Gruppen**: Vertikale Spalten (1-18)\n\n## Wichtige Elementgruppen\n\n### Alkalimetalle (Gruppe 1)\n\nSehr reaktive Metalle wie Lithium, Natrium und Kalium.\n\n### Halogene (Gruppe 17)\n\nReaktive Nichtmetalle wie Fluor, Chlor und Brom.\n\n### Edelgase (Gruppe 18)\n\nSehr reaktionsträge Gase wie Helium, Neon und Argon.\n\n## Periodische Trends\n\n- **Atomradius**: Nimmt von oben nach unten zu, von links nach rechts ab\n- **Elektronegativität**: Nimmt von links nach rechts zu\n- **Ionisierungsenergie**: Nimmt von links nach rechts zu\n\n## Bedeutung\n\nDas Periodensystem ermöglicht Vorhersagen über das Verhalten von Elementen und ist ein fundamentales Werkzeug der Chemie.",
                'status' => 'published',
                'featured' => true,
                'category_id' => $chemistryCategory->id,
                'author_id' => $admin->id,
            ],
            [
                'title' => 'Zellatmung: Energiegewinnung in Zellen',
                'slug' => 'zellatmung',
                'content' => "# Zellatmung: Energiegewinnung in Zellen\n\nDie Zellatmung ist der Prozess, bei dem Zellen Nährstoffe in Energie (ATP) umwandeln.\n\n## Gesamtgleichung\n\nC₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energie (ATP)\n\n## Die drei Hauptphasen\n\n### 1. Glykolyse\n\n- Ort: Cytoplasma\n- Glukose wird zu zwei Pyruvat-Molekülen abgebaut\n- Netto: 2 ATP + 2 NADH\n\n### 2. Citratzyklus (Krebs-Zyklus)\n\n- Ort: Mitochondrienmatrix\n- Pyruvat wird zu CO₂ abgebaut\n- Pro Pyruvat: 3 NADH + 1 FADH₂ + 1 ATP\n\n### 3. Elektronentransportkette\n\n- Ort: Innere Mitochondrienmembran\n- NADH und FADH₂ geben Elektronen ab\n- Sauerstoff ist der finale Elektronenakzeptor\n- Ca. 32-34 ATP werden produziert\n\n## Bedeutung\n\nDie Zellatmung ist essentiell für das Überleben aller aeroben Organismen und liefert die Energie für zelluläre Prozesse.",
                'status' => 'published',
                'featured' => false,
                'category_id' => $biologyCategory->id,
                'author_id' => $user->id,
            ],
            [
                'title' => 'Quantenmechanik für Anfänger',
                'slug' => 'quantenmechanik-anfaenger',
                'content' => "# Quantenmechanik für Anfänger\n\nDie Quantenmechanik beschreibt das Verhalten von Materie und Energie auf atomarer und subatomarer Ebene.\n\n## Grundkonzepte\n\n### Welle-Teilchen-Dualismus\n\nLicht und Materie können sowohl Wellen- als auch Teilcheneigenschaften zeigen.\n\n### Heisenbergsche Unschärferelation\n\nMan kann nicht gleichzeitig den Ort und den Impuls eines Teilchens beliebig genau messen.\n\n### Superposition\n\nEin Quantensystem kann sich in mehreren Zuständen gleichzeitig befinden, bis es gemessen wird.\n\n## Berühmte Gedankenexperimente\n\n### Schrödingers Katze\n\nEine Katze in einer verschlossenen Kiste ist gleichzeitig lebendig und tot, bis jemand nachsieht.\n\n## Anwendungen\n\n- Laser\n- Transistoren\n- Quantencomputer\n- MRI-Scanner\n\nDie Quantenmechanik ist eine der erfolgreichsten Theorien der Physik und hat unsere technologische Welt grundlegend verändert.",
                'status' => 'published',
                'featured' => true,
                'category_id' => $physicsCategory->id,
                'author_id' => $admin->id,
            ],
        ];

        foreach ($articles as $articleData) {
            $article = Article::create($articleData);

            // Create a revision for each article
            ArticleRevision::create([
                'article_id' => $article->id,
                'editor_id' => $article->author_id,
                'summary' => 'Erste Version des Artikels',
            ]);
        }
    }
}
