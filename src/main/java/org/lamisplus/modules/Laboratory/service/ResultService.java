package org.lamisplus.modules.Laboratory.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.audit4j.core.util.Log;
import org.lamisplus.modules.Laboratory.domain.dto.LastTestResult;
import org.lamisplus.modules.Laboratory.domain.dto.ResultDTO;
import org.lamisplus.modules.Laboratory.domain.entity.Result;
import org.lamisplus.modules.Laboratory.domain.entity.Test;
import org.lamisplus.modules.Laboratory.domain.mapper.LabMapper;
import org.lamisplus.modules.Laboratory.repository.ResultRepository;
import org.lamisplus.modules.Laboratory.repository.TestRepository;
import org.lamisplus.modules.base.domain.entities.User;
import org.lamisplus.modules.base.service.UserService;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.lamisplus.modules.Laboratory.utility.LabUtils.RESULT_REPORTED;


@Service
@RequiredArgsConstructor
@Slf4j
public class    ResultService {
    private final ResultRepository repository;
    private final LabMapper labMapper;
    private final PersonRepository personRepository;
    private final TestRepository testRepository;
    private  final UserService userService;

    public ResultDTO Save(ResultDTO resultDTO){
        Result result = labMapper.toResult(resultDTO);

        result.setUuid(UUID.randomUUID().toString());
        Test test = testRepository.findByIdAndArchived(result.getTestId(), 0).orElse(null);
        assert test != null;
        test.setLabTestOrderStatus(RESULT_REPORTED);
        testRepository.save(test);

        result.setPatientUuid(test.getPatientUuid());
        result.setPatientId(test.getPatientId());
        result.setFacilityId(getCurrentUserOrganization());
        result.setArchived(0);
        return labMapper.toResultDto(repository.save(result));
    }

    private Long getCurrentUserOrganization() {
        Optional<User> userWithRoles = userService.getUserWithRoles ();
        return userWithRoles.map (User::getCurrentOrganisationUnitId).orElse (null);
    }

    public ResultDTO Update(int order_id, ResultDTO resultDTO){
        Result updated_result = labMapper.toResult(resultDTO);
        return labMapper.toResultDto(repository.save(updated_result));
    }

    public String Delete(Integer id){
        Result labOrder = repository.findByIdAndArchived(id, 0).orElse(null);
        //repository.delete(labOrder);
        labOrder.setArchived(1);
        repository.save(labOrder);

        return id.toString() + " deleted successfully";
    }

    public ResultDTO GetResultsById(Integer id){
        return labMapper.toResultDto(repository.findByIdAndArchived(id, 0).orElse(null));
    }

    public ResultDTO GetResultsByTestId(Integer TestId){
        List<Result> resultList = repository.findAllByTestIdAndArchived(TestId, 0);

        if(resultList.size() > 0) {
            return labMapper.toResultDto(resultList.get(0));
        }
        else {
            return new ResultDTO();
        }
    }

    public LastTestResult convertResultToLastTestResult(Result result) {
        LastTestResult lastTestResult = new LastTestResult();
        lastTestResult.setResultReported(result.getResultReported());
        lastTestResult.setDateResultReported(LocalDate.from(result.getDateResultReported()));
        lastTestResult.setId(result.getId());
        lastTestResult.setPatientUuid(result.getPatientUuid());
        lastTestResult.setPatientId(result.getPatientId());
        return lastTestResult;
    }

}
