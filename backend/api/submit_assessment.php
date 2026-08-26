<?php
require_once '../config/cors.php'; require_once '../config/db.php'; require_once '../config/auth.php';
$smeId=requireSme(); $d=jsonInput(); $assessment=$d['assessment_type']??''; $answers=$d['answers']??[];
$allowed=['Readiness','Barrier','Performance']; if(!in_array($assessment,$allowed,true) || !is_array($answers) || !$answers){http_response_code(400);echo json_encode(['error'=>'Assessment type and answers are required']);exit;}
$st=$pdo->prepare('SELECT business_type FROM smes WHERE id=?');$st->execute([$smeId]);$type=$st->fetchColumn();
$q=$pdo->prepare('SELECT id,dimension FROM assessment_questions WHERE assessment_type=? AND active=1 AND (business_type="ALL" OR business_type=?)');$q->execute([$assessment,$type]);$questions=$q->fetchAll();
$byId=[];foreach($questions as $qq)$byId[(string)$qq['id']]=$qq;
$dim=[];$valid=[];
foreach($answers as $qid=>$value){$key=(string)$qid;if(!isset($byId[$key]))continue;$v=(float)$value;if($v<1||$v>5)continue;$dim[$byId[$key]['dimension']][]=$v;$valid[$key]=$v;}
if(count($valid)!==count($questions)){http_response_code(400);echo json_encode(['error'=>'Please answer every question before submitting']);exit;}
$dimScores=[];$all=[];foreach($dim as $name=>$vals){$score=array_sum($vals)/count($vals);$dimScores[$name]=['score'=>round($score,2),'level'=>levelFor($score)];$all=array_merge($all,$vals);} $overall=array_sum($all)/count($all);$overallLevel=levelFor($overall);
try{$pdo->beginTransaction();$s=$pdo->prepare('INSERT INTO assessment_sessions(sme_id,assessment_type,overall_score,level) VALUES(?,?,?,?)');$s->execute([$smeId,$assessment,round($overall,2),$overallLevel]);$sessionId=(int)$pdo->lastInsertId();$r=$pdo->prepare('INSERT INTO assessment_responses(session_id,question_id,answer_value) VALUES(?,?,?)');foreach($valid as $qid=>$v)$r->execute([$sessionId,(int)$qid,$v]);$sc=$pdo->prepare('INSERT INTO assessment_scores(session_id,dimension,score,level) VALUES(?,?,?,?)');foreach($dimScores as $name=>$x)$sc->execute([$sessionId,$name,$x['score'],$x['level']]);$pdo->commit();echo json_encode(['success'=>true,'session_id'=>$sessionId,'overall_score'=>round($overall,2),'level'=>$overallLevel,'dimensions'=>$dimScores]);}catch(Throwable $e){if($pdo->inTransaction())$pdo->rollBack();http_response_code(500);echo json_encode(['error'=>'Could not save assessment']);}
