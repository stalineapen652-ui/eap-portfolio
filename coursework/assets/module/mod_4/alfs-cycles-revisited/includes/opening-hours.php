<?php
/*
 * OPENING STATUS PILL (minimal)
 * Single-line indicator: "Open" or "Closed", plus a short next-event note.
 *
 * Source of truth = $hours array below. Server-side renders the initial
 * state against the server's local time (best-effort, used only as a
 * no-JS fallback). Once scripts.js loads it recomputes against the
 * visitor's local time and replaces the text — see scripts.js.
 * The same $hours array is emitted as a JSON data-hours attribute so
 * JS doesn't duplicate the schedule.
 *
 * Visible text alone communicates state ("Open" / "Closed") — colour
 * is reinforcement only, never the sole signal (WCAG 1.4.1).
 */

// Hours in minutes-from-midnight per ISO short day name (matches PHP date('D')).
$hours = [
    'Mon' => [9 * 60, 17 * 60 + 30],
    'Tue' => [9 * 60, 17 * 60 + 30],
    'Wed' => [9 * 60, 17 * 60 + 30],
    'Thu' => [9 * 60, 17 * 60 + 30],
    'Fri' => [9 * 60, 17 * 60 + 30],
    'Sat' => [9 * 60, 17 * 60 + 30],
    'Sun' => null,
];

$now  = new DateTime('now');                                     // server local
$day  = $now->format('D');                                       // Mon, Tue, ...
$mins = ((int) $now->format('G')) * 60 + ((int) $now->format('i'));

$today  = $hours[$day] ?? null;
$isOpen = $today && $mins >= $today[0] && $mins < $today[1];

function fmt_time(int $m): string {
    return sprintf('%d:%02d', intdiv($m, 60), $m % 60);
}

// Build the short editorial copy after the state word.
if ($isOpen) {
    $note = ' · until ' . fmt_time($today[1]);
} elseif ($today && $mins < $today[0]) {
    $note = ' · opens ' . fmt_time($today[0]);
} else {
    // Find the next open day
    $order  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    $idx    = array_search($day, $order, true);
    $note   = '';
    for ($i = 1; $i <= 7; $i++) {
        $next = $order[($idx + $i) % 7];
        if ($hours[$next]) {
            $note = ' · opens ' . ($i === 1 ? 'tomorrow' : $next) . ' ' . fmt_time($hours[$next][0]);
            break;
        }
    }
}

$state     = $isOpen ? 'open' : 'closed';
$label     = $isOpen ? 'Open' : 'Closed';
$tooltip   = trim($label . $note);
$hoursJson = htmlspecialchars(json_encode($hours), ENT_QUOTES, 'UTF-8');
?>
<p data-shop-status
   data-state="<?= $state ?>"
   data-hours="<?= $hoursJson ?>"
   title="<?= htmlspecialchars($tooltip) ?>"
   aria-live="polite"><?= $label ?></p>
